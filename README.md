# Hasura Hello World
> Get started with a free Hasura Project

This quickstart consists of a basic hasura project with a simple nodejs express app running on it. Once this project is deployed on to a hasura cluster, you will have the nodejs app will run at https://www.cluster-name.hasura-app.io

## Sections

* [Introduction](#introduction)
* [Data API](#data-apis)
* [Auth API](#auth-apis)
* [Filestore API](#file-apis)
* [Notify API](#notify-apis)
* [Custom Microservice](#add-your-own-custom-microservice)

## Introduction

This quickstart project comes with the following by default:
1. A basic hasura project
2. Two tables `article` and `author` with some dummy data
3. A basic nodejs-express app which runs on the `www` subdomain.

### Accessing Console

Now that you have deployed the project on your cluster, you would want to manage the schema and explore APIs.

Access the **api-console** via the following command:

```
$ hasura api-console
```

This will open up Console UI on the browser. You can access it at [http://localhost:9695](http://localhost:9695)

### Usage

Using the **api-console**, you can explore different Hasura APIs.

The API console will open the API Explorer tab, where you can try out APIs (Data, Auth, Filestore and Notify) using the API Collections on the left.

## Data APIs


The Hasura Data API provides a ready-to-use HTTP/JSON API backed by a PostgreSQL database.

These APIs are designed to be used by any client capable of making HTTP requests, especially
and are carefully optimized for performance.

The Data API provides the following features:
* CRUD APIs on PostgreSQL tables with a MongoDB-esque JSON query syntax.
* Rich query syntax that supports complex queries using relationships.
* Role based access control to handle permissions at a row and column level.

 The url to be used to make these queries is always of the type: `https://data.cluster-name.hasura-app.io/v1/query` (in this case `https://data.h34-excise98-stg.hasura-app.io`)

As mentioned earlier, this quickstart app comes with two pre-created tables `author` and `article`.

#### author

column | type
--- | ---
id | integer NOT NULL *primary key*
name | text NOT NULL

#### article

column | type
--- | ---
id | serial NOT NULL *primary key*
title | text NOT NULL
content | text NOT NULL
rating | numeric NOT NULL
author_id | integer NOT NULL


Alternatively, you can also view the schema for these tables on the api console by heading over to the tab named `data`.

You can just paste the queries shown below into the json textbox in the API explorer and hit send to test them out.
(The following is a short set of examples to show the power of the Hasura Data APIs, check out our [documentation](https://docs.hasura.io/) for more when you're done here!)

Let's look at some sample queries to explore the Data APIs:

### CRUD
Simple CRUD Operations are supported via an intuitive JSON query language.

* Select all entries in the article table, ordered by rating:
```json
{
    "type": "select",
    "args": {
        "table": "article",
        "columns": ["*"],
        "order_by": [
            {
                "column": "rating"
            }
        ]
    }
}
```

* Update a particular entry in the author table:
```json
{
    "type": "update",
    "args": {
        "table": "author",
        "where": {
            "name": {
                "$eq": "Adams"
            }
        }
    }
}
```

* The where clause on the Data API is a very expressive boolean expression, and can be arbitrarily complex. For example:
```json
{
    "type": "select",
    "args": {
        "table": "article",
        "columns": [
            "content",
            "rating"
        ],
        "where": {
            "$and": [
                {
                    "$or": [
                        {
                            "author_id": {
                                "$eq": "7"
                            }
                        },
                        {
                            "title": {
                                "$like": "Editorial%"
                            }
                        }
                    ]
                },
                {
                    "rating": {
                        "$gte": "3"
                    }
                }
            ]
        },
        "order_by": [
            {
                "column": "rating",
                "order": "asc"
            }
        ]
    }
}
```

  This query will select all the articles with ratings above 3, which were either written by an author with author_id 7 or, which have a title starting with "Editorial". This can be used to construct complex queries that feel very intuitive.

* Pagination on queries is supported through limit and offset parameters:
```json
{
    "type": "select",
    "args": {
        "table": "article",
        "columns": ["*"],
        "limit": "10",
        "offset": "20"
    }
}
```

* Raw SQL:  The APIs support running arbitrary SQL queries through a run_sql type key.

This can be used to perform queries directly on the postgres db:
```json
{
    "type" : "run_sql",
    "args" : {
        "sql" : "CREATE TABLE category (
                     id SERIAL NOT NULL PRIMARY KEY,
                     name TEXT NOT NULL
                 );"
    }
}
```

### Relationships

Modelling data in an RDBMS involves establishing connections between various tables through foreign key constraints. These can be used to build more complex relationships, which can be used to fetch related data alongside the columns queried, as pseudo columns.

In the standard article-author sample schema, the relationships we can define are:
1. Articles have an object/many-to-one relationship with authors
2. Authors have an array/one-to-many relationship with articles.

We can define these relationships on the database, and use them to get related data by expanding the relationships in the columns array:
```json
{
    "type": "select",
    "args": {
        "table": "author",
        "columns": [
            "name",
            {
                "name": "articles",
                "columns": [
                    "content",
                    "title",
                    "rating"
                ]
            }
        ]
    }
}
```

This query will add an array of article objects alongside the name of the author.

You can also use the standard where/order_by/offset/limit conditions on the article objects:
```json
{
    "type": "select",
    "args": {
        "table": "author",
        "columns": [
            "name",
            {
                "name": "articles",
                "columns": [
                    "content",
                    "title",
                    "rating"
                ],
                "where": {
                    "rating": {
                        "$gte": "3"
                    }
                },
                "order_by": [{
                    "column": "rating",
                    "order": "desc"
                }]
            }
        ],
        "where": {
            "name": {
                "$like": "A%"
            }
        }
    }
}
```

This will get us a list of all articles with rating greater than 3 by authors with names starting with A, ordered by rating among articles by the same author.

All this and more can be done with a single query!

### Aggregations

The JSON based query language is designed to be simple yet powerful. That said, there will be queries that cannot be expressed through the select query, like getting the number of ratings given for each article, if you have the ratings by user data stored in another table.

To express complex queries like aggregations, window functions, custom joins etc, you can directly use SQL.
```json
{
  "type" : "run_sql",
  "args" : {
    "sql" : "CREATE VIEW article_rating_count AS...",
  }
}
```

If you can define a view with your query in SQL, you can then track it with the Data APIs, and use the JSON query language to access it.
```json
{
  "type" : "add_existing_table_or_view",
  "args" : {
    "name" : "article_rating_count"
  }
}
```

  Note that views are read only, so you can only perform select queries on them. You can also manually define object relationships on views, in order to easily obtain them from select queries on other tables.

### Role based access control

Permissions on the Data APIs are designed to restrict the operations that can be performed on the database by various users/roles. The Data APIs support setting permissions on various CRUD operations at a row/column granularity.  By default, the admin role has access to all operations.

This is accomplished through the session middleware that Hasura provides. This session middleware provides the Data API with the role and user id of the current user with every request, and this lets the Data service apply the permissions as appropriate.

* The permissions can be based on a user id check from the information provided by the session middleware:
```json
{
    "type" : "create_insert_permission",
    "args" : {
        "table" : "article",
        "role" : "user",
        "permission" : {
            "check" : {
                "author_id" : "REQ_USER_ID"
            }
        }
    }
}
```

  This query will set select permissions on the article table for the user role so that users will be able only insert entries into the article table with author_ids matching their user ids. This means that the database will not permit a user to write an article in another user's name.
  This sort of a constraint is a property of the data, and therefore should be accomplished in the database, and the permission layer provides the perfect tools for the job.
  Apart from create_insert_permissions, the Data API also provides other types of queries to create select/update and delete permissions. This way, permissions can be set on all CRUD operations.

* The permission object in the json query uses syntax very similar to a where clause in the select query, making it extremely expressive,  as shown here:
```json
{
    "type" : "create_update_permission",
    "args" : {
        "table" : "article",
        "role" : "user",
        "permission" : {
            "check" : {
                "author_id" : "REQ_USER_ID",
                "$or" : [
                    {
                        "category" : "editorial",
                        "is_reviewed" : false
                    },
                    {
                        "category" : { "$neq" : "editorial"}
                    }
                ]
            }
        }
    }
}
```

This query sets insert permissions on the article table for the user role so that users can only insert entries into the table if the author_id is the same as their user id, and if is_reviewed is false when the category is editorial.

* This permissions setup can be further improved by creating custom roles. For example, the above schema can be improved by having an author role that can be given permissions to edit only the article table, and nothing else.

This is very useful for a more complex schema, say a forum, with several types of users like admins, moderators, thread owners, and normal users.

## Auth APIs

Every app almost always requires some form of authentication. This is useful to identify a user and provide some sort of personalised experience to the user. Hasura provides various types of authentication (username/password, mobile/otp, email/password, Google, Facebook etc).

You can try out these in the `API EXPLORER` tab of the `api console`. To learn more, check out our [docs](https://docs.hasura.io/0.15/manual/users/index.html)

## File APIs

Sometimes, you would want to upload some files to the cloud. This can range from a profile pic for your user or images for things listed on your app. You can securely add, remove, manage, update files such as pictures, videos, documents using the Hasura filestore.

This is done via simple POST, GET and DELETE requests on a single endpoint.

Just like the Data service, the File API supports Role based access control to the files, along with custom authorization hooks. (Check out our [ documentation ](https://docs.hasura.io/) for more!)

### Uploading files

Uploading a file requires you to generate a file_id and make a post request with the content of the file in the request body and the correct mime type as the content-type header.

```http
POST https://filestore.project-name.hasura-app.io/v1/file/05c40f1e-cdaf-4e29-8976-38c899 HTTP/1.1
Content-Type: image/png
Authorization: Bearer <token>

<content-of-file-as-body>
```

This is a very simple to use system, and lets you directly add an Upload button on your frontend, without spending time setting up the backend.

### Downloading files
Downloading a file requires the unique file id that was used to upload it. This can be stored in the database and retrieved for download.

To download a particular file, what is required is a simple GET query.
```http
GET https://filestore.project-name.hasura-app.io/v1/file/05c40f1e-cdaf-4e29-8976-38c899 HTTP/1.1
Authorization: Bearer <token>
```

### Permissions
By default, the File API provides three hooks to choose from

  1. Private: Only logged in users can upload/download.
  2. Public: Anyone can download, but only logged in users can upload.
  3. Read Only: Anyone can download, but no one can upload.

You can also set up your own authorization webhook!
(Check out our [ documentation ](https://docs.hasura.io/) for more!)

## Notify APIs

Check out the [ Learning center ](http://localhost:9695/learning-center) tab on the API Console for short tutorials on all the APIs!

## Add your own custom microservice

### Docker microservice

```
$ hasura microservice generate <service-name> -i <docker-image> -p <port>
```

### git push microservice

```bash
$ hasura microservice generate <service-name>
```

Once you have added a new service, you need to add a route to access the service.

### Add route for the service created.

```bash
$ hasura conf generate-route <service-name> >> conf/routes.yaml
```

It will generate the route configuration for the service and append it to `conf/routes.yaml`.

### Add a remote for the service

```bash
$ hasura conf generate-route <service-name> >> conf/ci.yaml
```

This will append the remotes configuration to the conf/remotes.yaml file under the {{ cluster.name }} key.

### Apply your changes

```
$ git add .
$ git commit -m "Added a new service"
$ git push hasura master
```

## Files and Directories

The project (a.k.a. project directory) has a particular directory structure and it has to be maintained strictly, else `hasura` cli would not work as expected. A representative project is shown below:

```
.
├── hasura.yaml
├── clusters.yaml
├── conf
│   ├── authorized-keys.yaml
│   ├── auth.yaml
│   ├── ci.yaml
│   ├── domains.yaml
│   ├── filestore.yaml
│   ├── gateway.yaml
│   ├── http-directives.conf
│   ├── notify.yaml
│   ├── postgres.yaml
│   ├── routes.yaml
│   └── session-store.yaml
├── migrations
│   ├── 1504788327_create_table_user.down.yaml
│   ├── 1504788327_create_table_user.down.sql
│   ├── 1504788327_create_table_user.up.yaml
│   └── 1504788327_create_table_user.up.sql
└── services
    └── www
        ├── src/
        ├── k8s.yaml
        └── Dockerfile
```

### `hasura.yaml`

This file contains some metadata about the project, namely a name, description and some keywords. Also contains `platformVersion` which says which Hasura platform version is compatible with this project.

### `clusters.yaml`

Info about the clusters added to this project can be found in this file. Each cluster is defined by it's name allotted by Hasura. While adding the cluster to the project you are prompted to give an alias, which is just hasura by default. The `kubeContext` mentions the name of kubernetes context used to access the cluster, which is also managed by hasura. The `config` key denotes the location of cluster's metadata on the cluster itself. This information is parsed and cluster's metadata is appended while conf is rendered. `data` key is for holding custom variables that you can define.

```yaml
- name: h34-ambitious93-stg
  alias: hasura
  kubeContext: h34-ambitious93-stg
  config:
    configmap: controller-conf
    namespace: hasura
  data: null
```
