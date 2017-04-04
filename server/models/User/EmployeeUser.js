var bcrypt = require("bcryptjs");
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var EmployeeSchema = new Schema({
  access: {type: String, default: "Employee"},
  email: String,
  password: String,
  name: String,
  picture: String,
  factory: {type: Schema.Types.ObjectId, ref: 'Factories'},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

EmployeeSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, 12);
};

EmployeeSchema.methods.authenticate = function(password){
  return bcrypt.compareSync(password, this.password);
};

Mongoose.model('Employees', EmployeeSchema);
