const hostname = process.argv[2]
const request = require('request')
 
const options = {
  url: 'http://gateway/',
  headers: {
    'Host': hostname
  }
}
 
request(options, (error, response, body) => {
  console.log(error || response)
})
