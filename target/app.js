const express = require('express')
const http = require('http')

const app = express();
app.set('port', process.env.PORT || 10010)

app.get('/', (req, res, next) => {
   console.log(req.headers)
   res.send(req.get('host'))
})

http.createServer(app).listen(app.get('port'), () => {
  console.log('target listening on port ' + app.get('port'))
})
