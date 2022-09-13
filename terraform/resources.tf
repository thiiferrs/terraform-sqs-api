resource "aws_sqs_queue" "app_sqs" {
  name                      = var.sqs_queue_name
  delay_seconds             = 0
  max_message_size          = 262144
  message_retention_seconds = 3600
  receive_wait_time_seconds = 0

  sqs_managed_sse_enabled = true

  tags = {
    Environment = "dev",
    Owner       = "Thiago"
  }

### Adiciona a variavel QUEUEURL com nome da fila no arquivo .env
  provisioner "local-exec" {
    command = "echo 'QUEUEURL=${self.id}' >> .env"
  }
}