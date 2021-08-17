const express = require('express')
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const fs = require('fs')
var JiraApi = require('jira-client');

var jira = new JiraApi({
  protocol: 'https',
  host: 'coldlambda.atlassian.net',
  username: process.env.JIRA_USER,
  password: process.env.JIRA_TOKEN,
  apiVersion: '2',
  strictSSL: true
});

app.post('/git', async (req,res) => {
  console.log(req.body)
  res
  .set('x-powered-by', 'cyclic.sh')
  .json({})
  .end()
})

app.get('/', async (req,res) => { 
 try{
  //  console.log(process.env)
  //  console.log(jira)
  jira.updateIssue('10000',{

  })
  console.log(req.query)
   var sprints = await jira.searchJira(`Summary ~ ${req.query.issue}`)

}catch(e){
  console.log(e.response.body)
  // console.log(e.response.data)
}


  res
    .set('x-powered-by', 'cyclic.sh')
    .json(sprints)
    .end()
})

module.exports = app
