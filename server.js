require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var session = require('express-session');
var uuid = require('node-uuid');
var MongoStore = require('connect-mongo')(session);

var path = require('path');
app.use(express.static(path.join(__dirname, './build')));

app.use(session({
  genid: function(req) {
    return uuid.v1();
  },
  store: new MongoStore({
    url: process.env.DB_HOST,
    autoRemove: 'native',
    touchAfter: 24 * 3600 // time period in seconds || = 24 hours; Let the session be updated once every 24 hours
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // log out after 1 month (days * hours * minutes * seconds * milliseconds)
  }
}));

//require mongoose
require('./server/config/mongoose.js');

//requiere routes
require('./server/config/routes.js')(app);

var port = (process.env.NODE_PORT || 8000);
app.listen(port, function() {
  console.log("Server running on port " + port);
})
