const express = require('express')
const app = express()
const fs = require('fs')
 
const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.region || "us-east-2",
});

const publish = async function (msg) {
   var params = {
     Message: JSON.stringify(msg),
     TopicArn: 'arn:aws:sns:us-east-2:348655018330:cyclic-per-region-init-AppLogsTopic-179X4JB0VLI5T',
     MessageAttributes: {
       app_id: {
         DataType: "String",
         StringValue: 'korostelevm-express-hello-world',
       },
     },
   };
   console.log(params)
   await sns.publish(params).promise();
 };
 
 


const VERSION_FILENAME='./.git/refs/heads/main'

app.get('/', (req, res) => {
  console.log('[hello-world] root handler called')
  var r = await publish({ts:Date.now(), line:'sadfasfd'});

  res
    .set('x-powered-by', 'cyclic.sh')
    .send(JSON.stringify(r))
    .end()
})

app.use('*', (req,res) => {
  console.log('[hello-world] Star handler called')
  let version = 'unknown'
  if (fs.existsSync(VERSION_FILENAME)) {
    version = fs.readFileSync(VERSION_FILENAME).toString().substr(0,8)
  }
  res
    .set('x-powered-by', 'cyclic.sh')
    .json({
      msg: "Not strickly part of the hello world but you get the picture.",
      version,
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      path: req.params[0],
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
    })
    .end()
})

module.exports = app
