var express = require('express');
const PORT = 8080;
const app = express();
//console.log(process.env)

var healthy=true;


app.get('/', function (req, res) {
  res.send('Hello world!');
});



app.get('/healthz', function (req, res) {
  console.log('health enquiry')
  if(healthy)
   res.send('OK');
  else
   res.status(404).send('NOT OK');
});


app.listen(PORT,'0.0.0.0');
console.log('Application running on port: ' + PORT);

