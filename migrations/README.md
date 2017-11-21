# migrations

All database migrations are stored in this directory.

You can create a migration using hasuractl migration commands or using the api-console.

Four files are created per migration:

- <timestamp_version>-name.up.yaml
- <timestamp_version>-name.up.sql
- <timestamp_version>-name.down.yaml
- <timestamp_version>-name.down.sql

You can apply these migrations on any cluster you add later also.