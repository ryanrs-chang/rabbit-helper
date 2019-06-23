# RabbitMQ Helper

# set environment

1. `RABBITMQ_CONFIG`

`config.json`

```js=
{
    "exchange": "test_topic",
    "url": "http://localhost:8080",
    "username": "guest",
    "password": "guest"
}
```

you can put it in `~/.rabbitmd_client`, then export it `export RABBITMQ_CONFIG=~/.rabbitmd_client/config.json`

---

```
mkdir -p ~/.rabbitmq_client

echo '{
    "exchange": "test_topic",
    "url": "http://localhost:8080",
    "username": "guest",
    "password": "guest"
}' > ~/.rabbitmq_client/config.json

export RABBITMQ_CONFIG=~/.rabbitmd_client/config.json

# check file content and variable
echo $RABBITMQ_CONFIG
cat ~/.rabbitmq_client/config.json
```

# How to use

-   check version: `rabbitmq_client -V`
-   manual: `rabbitmq_client --help`

## list all queue

`rabbitmq_client list`

```shell=
[ '1456',
  '183',
  'amq-181',
  'amq-183',
  'amq-184',
  'amq-1844123123',
  'amq-18444',
  'api-server',
  'api-server-gen-0tDcMewEEt.1557718602',
  'api-server-gen-0ynYy4kC2L.1558518106',
  'api-server-gen-14r9Gln6Lv.1558517112',
  'api-server-gen-2WgVz6Wpl9.1558505527',
  'api-server-gen-2q2rllTBIm.1555656606',
  'api-server-gen-3BrNHylT1k.1558516508',
  'api-server-gen-3lmwDNskKS.1558510365',
  ...
]
```

## delete queue

`rabbitmq_client delete --help`

```shell=
Usage: delete [options] <queue_name> [other_queue_names...]

delete queue by name or regex

Options:
  -e, --regex <string>  delete by regex
  -N, --Name <string>   delete by name
  -h, --help            output usage information
```

### assign `queue_name`

```shell=
rabbitmq_client delete -N api-server-gen-0tDcMewEEt.1557718602
```

### mulple delete by regex

Example: delete prefix is `api-server-gen-T`

```shell=
rabbitmq_client delete -e "api-server-gen-T"
```

Example: delete prefix is `api-server-gen`

```shell=
rabbitmq_client delete -e "api-server-gen-T"
```

Example: multiple regexp

```shell=
rabbitmq_client delete -e "api-server-gen-T" "api-server-gen-v"
```
