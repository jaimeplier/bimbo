var bcrypt = require("bcryptjs");
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var validateEmail = require("./../utils/validateEmail.js");

var UserSchema = new Schema({
  access: {type: String, enums: ["Master", "Admin", "Employee"], required: true},
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
  },
  password: String,
  name: {type: String, required: true},
  picture: String,
  reset_token: String,
  factory: {type: Schema.Types.ObjectId, ref: 'Factories'},
  last_activity: {type: Date, default: Date.now},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 12);
};

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var retJson = {
      email: ret.email,
      access: ret.access,
      name: ret.name,
      picture: ret.picture,
      factory: ret.factory,
    };
    return retJson;
  }
})

Mongoose.model('Users', UserSchema);
