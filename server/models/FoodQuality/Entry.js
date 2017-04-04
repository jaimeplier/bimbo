var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var VALUE = {
  value: String,
  score: Number,
  result: {type: String, enum: ['Success', 'Warning', 'Failure']}
}

var EntrySchema = new Schema({
  batch: String,
  product: {type: Schema.Types.ObjectId, ref: 'ProductLines'},
  expiration_label: VALUE,
  packaging: VALUE,
  size: VALUE,
  symmetry: VALUE,
  color: VALUE,
  crumb: VALUE
  crumb_color: VALUE,
  taste: VALUE,
  scent: VALUE,
  note: String,
  total_score: Number,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

Mongoose.model('Entries', EntrySchema);
