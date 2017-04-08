var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var FactorySchema = new Schema({
  name: {
    type:String,
    required: true,
    minlength: 3
  },
  product_lines: [{type: Schema.Types.ObjectId, ref: 'ProductLines'}],
  admins: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  employees: [{type: Schema.Types.ObjectId, ref: 'Users'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

Mongoose.model('Factories', FactorySchema);
