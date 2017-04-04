var bcrypt = require("bcryptjs");
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var AdminSchema = new Schema({
  access: {type: String, default: "Admin"},
  email: String,
  password: String,
  name: String,
  picture: String,
  factory: {type: Schema.Types.ObjectId, ref: 'Factories'},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

AdminSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, 12);
};

AdminSchema.methods.authenticate = function(password){
  return bcrypt.compareSync(password, this.password);
};


Mongoose.model('Admins', AdminSchema);
