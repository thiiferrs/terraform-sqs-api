### Steps

## Pre-requisitos
- Docker & Docker-compose
- Credencias AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY

1. Credenciais e IAM Policy*
Adicionar no arquivo terraform/.env as credenciais da AWS.


2. Criar um bucket no s3 para armazenamento do terraform state.
Depois de criar o bucket referencia-lo no arquivo terraform/backend.config


3. Subir o Amazon SQS

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

2. Enviar sugestao

Enviar um Payload (exemplo pelo Postman API Platform)

POST > 127.0.0.1:8081/order

Body > raw > JSON

criar o payload como no ex:
```
{
    "userEmail": "gandalf@email.com",
    "suggestion": "It is not despair, for despair is only for those who see the end beyond all doubt. We do not"
}
```