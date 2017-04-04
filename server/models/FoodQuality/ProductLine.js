var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ProductLineSchema = new Schema({
  name: String,
  product_name: String,
  factory: {type: Schema.Types.ObjectId, ref: 'Factories'},
  entries: [{type: Schema.Types.ObjectId, ref: 'Entries'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

Mongoose.model('ProductLines', ProductLineSchema);
