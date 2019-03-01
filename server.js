const express = require('express');
const bodyParse = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
app.use(bodyParse.urlencoded({extended : true}));
app.use(bodyParse.json());

mongoose.connect(dbConfig.url, {
    user: 'admin',
    pass: 'mongopwd',
    useNewUrlParser: true
  }).then(() => {
      console.log('Database successfully connected');
  }).catch(err => {
      console.log('Database connection failed. ', err);
      process.exit();
  });

app.get('/', (req,res) => {
    res.json({"message": "Welcome to retail application demo"});
});

require('./app/routes/user.routes.js') (app);

app.listen(port, () => {
    console.log("Server listing on port ",port);
});
