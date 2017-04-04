require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(express.static(path.join(__dirname, './build')));

//require mongoose
//require('./server/config/mongoose.js');

//requiere routes
require('./server/config/routes.js')(app);
app.listen(8000, function() {
  console.log("Server running on port 8000")
})
