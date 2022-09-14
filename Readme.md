### Steps
---
### Terraform

<br />

1. Credenciais e IAM Policy

- Criar um usuario com acesso programatico e com as permissões no quadro a seguir. 

- Criar um arquivo **.env** na pasta: **terraform/.env** com as credenciais - AWS_ACCESS_KEY_ID="" AWS_SECRET_ACCESS_KEY="" e AWS_DEFAULT_REGION=""

<br />

IAM Policy requerida:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "sqs:DeleteMessage",
                "s3:ListAccessPointsForObjectLambda",
                "sqs:UntagQueue",
                "sqs:ReceiveMessage",
                "s3:ListBucketVersions",
                "s3:ListBucket",
                "sqs:ListQueueTags",
                "ec2:DescribeAccountAttributes",
                "sqs:SetQueueAttributes",
                "sqs:GetQueueUrl",
                "sqs:ListQueues",
                "s3:ListBucketMultipartUploads",
                "sqs:ChangeMessageVisibility",
                "s3:ListAccessPoints",
                "s3:ListJobs",
                "sqs:SendMessage",
                "sqs:GetQueueAttributes",
                "s3:ListMultiRegionAccessPoints",
                "s3:ListMultipartUploadParts",
                "s3:ListStorageLensConfigurations",
                "sqs:TagQueue",
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListAllMyBuckets",
                "sqs:PurgeQueue",
                "sqs:DeleteQueue",
                "sqs:CreateQueue",
                "sts:GetCallerIdentity"
            ],
            "Resource": "*"
        }
    ]
}
```

<br />

2. Criar um bucket no s3 para o armazenamento do terraform state.

Depois de criar o bucket referencia-lo no arquivo [terraform/backend.config](https://github.com/thiiferrs/terraform-sqs-api/blob/main/terraform/backend.config)

<br />

3. Provisionamento do Amazon SQS

Executar o docker compose da pasta [terraform](https://github.com/thiiferrs/terraform-sqs-api/blob/main/terraform)

*Na primeira inicialização do compose já será feito a inicialiação (init) do terraform*
```
$ docker compose -f terraform/docker-compose.yml up
```

Depois do compose up executar terraform apply conforme o exemplo abaixo:
```
$ docker compose -f terraform/docker-compose.yml run --rm terraform apply -auto-approve
```

Para rodar os outros comandos do terraform:
```
$ docker compose -f terraform/docker-compose.yml run --rm terraform plan / apply / show / destroy
```

<br />

____

<br />

### Provisionamento da API node.js

<br />

4. Rodar o docker compose da pasta [sqs_api](https://github.com/thiiferrs/terraform-sqs-api/tree/main/sqs_api)

```
$ docker compose -f sqs_api/docker-compose.yml up
```


Ficara disponível as seguintes URLS:
```
http://host-ip:8081/index
http://host-ip:8081/order -> POST
```
<br />

5. Enviar mensagens para fila 

Para envio da mensagem enviar um Payload para a URL: http://host-ip:8081/order


Teste feito pelo Postman:

- New HTTP Request > POST > http://host-ip:8081/order
  - Selecionar Body > raw > JSON
  - Colar o conteudo do Payload, "userEmail" e "suggestion":
```json
{
    "userEmail": "...",
    "suggestion": "It is not despair, for despair is only for those who see the end beyond all doubt. We do not"
}
```
<br />

Depois do envio deverá aparecer na console a confirmação e a MessageId:
![Console envio da mensagem](https://imgur.com/v5rIKvs.png)

<br />

### Diagrama do projeto

![Diagrama](https://github.com/thiiferrs/terraform-sqs-api/blob/b91a7cfbd4c30c6e1afd420ba6db0d915b7718ec/AWS_SQS.drawio.png)