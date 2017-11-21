# conf

This directory has the configuration to deploy your project on any Hasura cluster. With the secrets (like API keys, client secrets) and this configuration, you can deploy the project on any Hasura cluster.

The configuration is templated so that it can be seamlessly used across multiple clusters. Templating also helps with the management of different kinds of clusters, for example you may have a dev, staging and production clusters where the configuration might differ slightly. The templates are written in [pongo2](https://github.com/flosch/pongo2), a jinja like templating language.

A context variable called `cluster` is available to be used in the templates. This is an extension of the cluster object present in `clusters.yaml` file. Apart from the keys present in `clusters.yaml`, a key called `metadata` with some cluster specific information will be present.

If you need to add your own variables, you can add them under the `data` key in `clusters.yaml` and this will be available as `cluster.data`

The entire context variable `cluster` can be viewed anytime using the command:

```bash
$ hasura cluster template-context
```

A typical context is as follows:

```yaml
name: h34-ambitious93-stg
alias: hasura
kubeContext: ambitious93
config:
  configmap: controller-conf
  namespace: hasura
metadata:
  filestore:
    volume:
      hostPath:
        path: /data/hasura.io/filestore
      name: filestore-pv
  gateway:
    externalIPs:
    - 111.222.33.44
    ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 80
    - name: https
      port: 443
      protocol: TCP
      targetPort: 443
    - name: ssh
      port: 22
      protocol: TCP
      targetPort: 22
  namespaces:
    hasura: hasura
    user: default
  postgres:
    volume:
      hostPath:
        path: /data/hasura.io/postgres
      name: postgres-pv
  registry: null
  sessionStore:
    volume:
      hostPath:
        path: /data/hasura.io/redis
      name: redis-pv
data: null
```
