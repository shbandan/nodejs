const express = require('express');
const bodyParse = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
app.use(bodyParse.urlencoded({extended : true}));
app.use(bodyParse.json());

var mongoUrl = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
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

console.log(mongoUrl);

var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
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

  console.log(mongoHost);
  console.log(mongoPort);
  console.log(mongoDatabase);
  console.log(mongoPassword);
  console.log(mongoUser);
  console.log(mongoUriParts);

app.get('/', (req,res) => {
    res.json({"message": "Welcome to retail application demo"});
});

require('./app/routes/user.routes.js') (app);

app.listen(port, () => {
    console.log("Server listing on port ",port);
});
