const express = require('express')
const app = express()
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

app.get('/', async (req,res) => {
 try{
  //  console.log(process.env)
  //  console.log(jira)
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
