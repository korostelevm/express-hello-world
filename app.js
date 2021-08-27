const express = require('express')
var bodyParser = require('body-parser')
var app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

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
var result = {a:'none'}
  console.log(req.body)
  console.log(req.headers)
  if(!req.body.issue){
    return res.send('not issue | '+ JSON.stringify(req.body))
  }
  try{
    result = req.body
    //  console.log(jira)asdf
    // jira.updateIssue('10000',{
  
    // })
  
   var r = await jira.addNewIssue({
    "update": {},
    "fields": {
      "summary": 'from github | '+req.body.issue.title,
      "description": req.body.issue.body,
      // "parent": {
      //   "key":sadf "HELLO"
      // },
      "issuetype": {
        "id": "10001"
      },
    //   "components": [
    //     {
    //       "id": "10000"
    //     }
    //   ],
      // "customfield_10029": req.body.issue.html_url,
    //   "customfield_40000": {
    //     "type": "doc",
    //     "version": 1,
    //     "content": [
    //       {
    //         "type": "paragraph",
    //         "content": [
    //           {
    //             "text": "Occurs on all orders",
    //             "type": "text"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   "customfield_70000": [
    //     "jira-administrators",
    //     "jira-software-users"
    //   ],
      "project": {
        "key": "HELLO"
      },
    //   "description": {
    //     "type": "doc",
    //     "version": 1,
    //     "content": [
    //       {
    //         "type": "paragraph",
    //         "content": [
    //           {
    //             "text": "Order entry fails when selecting supplier.",
    //             "type": "text"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   "reporter": {
    //     "id": "5b10a2844c20165700ede21g"
    //   },
    //   "fixVersions": [
    //     {
    //       "id": "10001"
    //     }
    //   ],
    //   "customfield_10000": "09/Jun/19",
    //   "priority": {
    //     "id": "20000"
    //   },
    //   "labels": [
    //     "bugfix",
    //     "blitz_test"
    //   ],
    //   "timetracking": {
    //     "remainingEstimate": "5",
    //     "originalEstimate": "10"
    //   },
    //   "customfield_30000": [
    //     "10000",
    //     "10002"
    //   ],
    //   "customfield_80000": {
    //     "value": "red"
    //   },
    //   "security": {
    //     "id": "10000"
    //   },
    //   "environment": {
    //     "type": "doc",
    //     "version": 1,
    //     "content": [
    //       {
    //         "type": "paragraph",
    //         "content": [
    //           {
    //             "text": "UAT",
    //             "type": "text"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   "versions": [
    //     {
    //       "id": "10000"
    //     }
    //   ],
    //   "duedate": "2019-05-11",
    //   "customfield_60000": "jira-software-users",
    //   "customfield_50000": {
    //     "type": "doc",
    //     "version": 1,
    //     "content": [
    //       {
    //         "type": "paragraph",
    //         "content": [
    //           {
    //             "text": "Could impact day-to-day work.",
    //             "type": "text"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   "assignee": {
    //     "id": "5b109f2e9729b51b54dc274d"
    //   }
    }
  })
  
  }catch(e){
    // console.log()
    return res
  .set('x-powered-by', 'cyclic.sh')
  .json(e.response.body)
  // .json(e.response.body)
  .end()
    // console.log(e.response.data)
  }

  
  return res
  .set('x-powered-by', 'cyclic.sh')
  .json(result)
  .end()
})

app.get('/', async (req,res) => { 
 try{
  //  console.log(process.env)
  //  console.log(jira)
  // jira.updateIssue('10000',{

  // })
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
