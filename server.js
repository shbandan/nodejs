const express = require('express');
const bodyParse = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
app.use(bodyParse.urlencoded({extended : true}));
app.use(bodyParse.json());

var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
var mongoURLLabel = "";

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
    console.log(connection_string);
  }

if (mongoURL == null) {
    var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
    // If using plane old env vars via service discovery
    if (process.env.DATABASE_SERVICE_NAME) {
      var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
      mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
      mongoUser = process.env[mongoServiceName + '_USER'];
  
    // If using env vars from secret from service binding  
    } else if (process.env.database_name) {
      mongoDatabase = process.env.database_name;
      mongoPassword = process.env.password;
      mongoUser = process.env.username;
      var mongoUriParts = process.env.uri && process.env.uri.split("//");
      if (mongoUriParts.length == 2) {
        mongoUriParts = mongoUriParts[1].split(":");
        if (mongoUriParts && mongoUriParts.length == 2) {
          mongoHost = mongoUriParts[0];
          mongoPort = mongoUriParts[1];
        }
      }
    }
  
    if (mongoHost && mongoPort && mongoDatabase) {
      mongoURLLabel = mongoURL = 'mongodb://';
      if (mongoUser && mongoPassword) {
        //mongoURL += 'admin' + ':' + 'mongopwd' + '@';
      }
      // Provide UI label that excludes user id and pw
      mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
      mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
    }
  }

  console.log(mongoURL);
  mongoose.connect(mongoURL, {
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
