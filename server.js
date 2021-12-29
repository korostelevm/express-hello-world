process.env.JIRA_USER = 'michael.korostelev@cyclic.sh'
process.env.JIRA_TOKEN = 'oqAPpQLszlnKYqRadWkf754A'
const app = require('./app')

const port = process.env.PORT || 3443
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
