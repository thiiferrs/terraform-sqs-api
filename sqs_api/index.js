const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()
//console.log(process.env)

const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

app.get('/index', (req, res) => {
  res.send("Welcome to suggestions API - v.04")
});

console.log(`Servidor rodando na porta: ${port}`);
app.listen(port);


// SQS
var AWS = require('aws-sdk');

AWS.config.update({region: process.env.AWS_DEFAULT_REGION});

// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

app.post('/order', (req, res) => {

  let orderData = {
      'userEmail': req.body['userEmail'],
      'suggestion': req.body['suggestion']
  }
  // Remove DelaySeconds parameter and value for FIFO queues
  let sqsOrderData = {
      DelaySeconds: 10,
      MessageAttributes: {
        "userEmail": {
          DataType: "String",
          StringValue: orderData.userEmail
        },
        "suggestion": {
          DataType: "String",
          StringValue: orderData.suggestion
        }
      },
      MessageBody: JSON.stringify(orderData),
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl: process.env.QUEUEURL
  };

  // Send the msg data to the SQS queue
  let sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

  sendSqsMessage.then((data) => {
      console.log("SUCCESSO, MessageId: ", data.MessageId);
      res.send("Msg enviada");
  }).catch((err) => {
      console.log("ERROR: ",err);
      res.send("Error. Tente novamente.");
  });
});



