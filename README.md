# RabbitMQ Helper

1. `git clone this_repository`
2. `cd ./this_repository`
3. `npm link`
4. `rabbit-helper --help`

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

you can put it in `~/.rabbit-helper`, then export it `export RABBITMQ_CONFIG=~/.rabbit-helper/config.json`

---

```
mkdir -p ~/.rabbit-helper

echo '{
    "exchange": "test_topic",
    "url": "http://localhost:8080",
    "username": "guest",
    "password": "guest"
}' > ~/.rabbit-helper/config.json

export RABBITMQ_CONFIG=~/.rabbit-helper/config.json

# check file content and variable
echo $RABBITMQ_CONFIG
cat ~/.rabbit-helper/config.json
```

# How to use

-   check version: `rabbit-helper -V`
-   manual: `rabbit-helper --help`

## list all queue

`rabbit-helper list`

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

`rabbit-helper delete --help`

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
rabbit-helper delete -N api-server-gen-0tDcMewEEt.1557718602
```

### multiple delete by regex

**Example**: delete prefix is `api-server-gen-T`

```shell=
rabbit-helper delete -e "api-server-gen-T"
```

**Example**: delete prefix is `api-server-gen`

```shell=
rabbit-helper delete -e "api-server-gen-T"
```

**Example**: multiple regexp

```shell=
rabbit-helper delete -e "api-server-gen-T" "api-server-gen-v"
```

## publish messag to queue

```
Usage: publish [options] <routing_key> [others_option]

publish message to exchange

Options:
  -e, --exchange <string>  assign exchange for publish
  -f, --file <string>      set file path
  -m, --message <string>   set publish message
  -h, --help               output usage information
```

**Example**: publish `string` type message

```shell=
rabbit-helper publish routing_key -m 'string_type_message'
```

**Example**: publish message form file

`cat ./test_message.json`

```
{
    "method": "get",
    "action": "/service/list",
    "body": {}
}
```

```shell=
rabbit-helper publish routing_key -f ./test_message.json
```

**Example**: assign an `exchange` instead of the `default exchange`

```shell=
rabbit-helper publish routing_key -m 'test_string_message'
```
