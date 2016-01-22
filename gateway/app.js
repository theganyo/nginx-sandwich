const express = require('express')
const http = require('http')
const request = require('request')

const outbound_nginx = process.env.outbound

const app = express();
app.set('port', process.env.PORT || 10010)

app.get('/', (req, res, next) => {

  console.log(req.headers)

  // back to nginx
  const options = {
    url: outbound_nginx,
    headers: {
      'Host': req.get('host')
    }
  }

  console.log('gateway request:', options)

  request(options, (error, response, body) => {
    console.log(error || response.body)
    res.send(error || response.body)
  })  
})

http.createServer(app).listen(app.get('port'), () => {
  console.log('gateway listening on port ' + app.get('port'))
})
