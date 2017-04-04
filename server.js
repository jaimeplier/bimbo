require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(express.static(path.join(__dirname, './build')));
