# eGyan
eGyan is a web application built with Node.js (Express) and Hasura (https://hasura.io/) Platform. It is a simple and effective eLearning app for everyone.

## Setup

* [Setup the Hasura CLI](#setup-the-hasura-cli)
* [Required Project Structure](#required-project-structure)
* [Hasura cluster](#hasura-cluster)
* [Deploy the Project](#deploy-the-project)
* [Accessing Console](#accessing-console)


## Setup the Hasura CLI

The hasura CLI is a command line utility to help you get your backend setup quickly. It helps you create projects, manage clusters and manage microservices and explore APIs running on the cluster.
The instructions for setup are available from [here](https://docs.hasura.io/0.15/manual/tutorial/1-setup-hasura-cli.html).

### Login

Next, login or register by running the following command:

```
$ hasura login
```

This command will open up the browser and allow you to register with a new account (or login to your existing account).

## Required Project Structure

The project (a.k.a. project directory) has a particular directory structure and it has to be maintained strictly, else `hasura` cli would not work as expected. A *representative project* is shown below:

```
.
├── hasura.yaml
├── clusters.yaml
├── conf
│   ├── authorized-keys.yaml
│   ├── auth.yaml
│   ├── ci.yaml
│   ├── domains.yaml
│   ├── filestore.yaml
│   ├── gateway.yaml
│   ├── http-directives.conf
│   ├── notify.yaml
│   ├── postgres.yaml
│   ├── routes.yaml
│   └── session-store.yaml
├── migrations
│   ├── 1504788327_create_table_user.down.yaml
│   ├── 1504788327_create_table_user.down.sql
│   ├── 1504788327_create_table_user.up.yaml
│   └── 1504788327_create_table_user.up.sql
└── microservices
    ├── adminer
    │   └── k8s.yaml
    └── flask
        ├── src/
        ├── k8s.yaml
        └── Dockerfile
```

### `hasura.yaml`

This file contains some metadata about the project, namely a name, description and some keywords. Also contains `platformVersion` which says which Hasura platform version is compatible with this project.

### `clusters.yaml`

Info about the clusters added to this project can be found in this file. Each cluster is defined by it's name allotted by Hasura. While adding the cluster to the project you are prompted to give an alias, which is just hasura by default. The `kubeContext` mentions the name of kubernetes context used to access the cluster, which is also managed by hasura. The `config` key denotes the location of cluster's metadata on the cluster itself. This information is parsed and cluster's metadata is appended while conf is rendered. `data` key is for holding custom variables that you can define.

## Hasura cluster

We need a Hasura cluster where we can deploy our project.
The instructions for creating a Hasura cluster are available from [here](https://docs.hasura.io/0.15/manual/tutorial/3-hasura-cluster.html).

### Get cluster information and the microservices running

Inside your project directory, run:

```
$ hasura cluster status
```

## Deploy the Project

```
$ git add .
$ git commit -m "eGyan initial commit"
$ git push hasura master
```
Once this project is deployed on to a hasura cluster, you will have eGyan app running at *https://www.<cluster-name>.hasura-app.io*

## Accessing Console

Now that you have deployed the project on your cluster, you would want to manage the schema and explore APIs.

Access the **api-console** via the following command:

```
$ hasura api-console
```

This will open up Console UI on the browser. You can access it at [http://localhost:9695](http://localhost:9695)

## License
eGyan is open-sourced software licensed under the MIT license. See the LICENSE for more.
