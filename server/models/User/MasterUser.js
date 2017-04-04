var bcrypt = require("bcryptjs");
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var MasterSchema = new Schema({
  access: {type: String, default: "Master"},
  email: String,
  password: String,
  name: String,
  picture: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

MasterSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, 12);
};

MasterSchema.methods.authenticate = function(password){
  return bcrypt.compareSync(password, this.password);
};

Mongoose.model('Master', MasterSchema);
