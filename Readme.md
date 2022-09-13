### Steps

## Pre-requisitos
- Docker & Docker-compose

1. Credenciais e IAM Policy*

Criar um arquivo .env na pasta: terraform/.env com as credenciais - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY e AWS_DEFAULT_REGION.

2. Criar um bucket no s3 para o armazenamento do terraform state.

Depois de criar o bucket referencia-lo no arquivo terraform/backend.config

3. Provisionar o Amazon SQS

Dentro da pasta terraform, executar o docker compose up para subir o terraform e rodar o init

```
docker compose up
```

Depois do compose up executar terraform apply
```
docker compose run --rm terraform apply -auto-approve
```

Outros comandos:
```
docker compose run --rm terraform plan / apply / show / destroy
```


### Provisionamento da API node.js

Rodar o docker compose up localizado na pasta sqs_api

```
127.0.0.1:8081/index
127.0.0.1:8081/order -> API
```

2. Enviar mensagens para fila

Enviar um Payload como no exemplo abaixo (Teste feito pelo Postman)

Postman:

POST > 127.0.0.1:8081/order

Selecionar Body > raw > JSON
Colar o conteudo:
```
{
    "userEmail": "...",
    "suggestion": "It is not despair, for despair is only for those who see the end beyond all doubt. We do not"
}
```