const mongoose = require('mongoose');
const { Schema } = mongoose;

const calloutSchema = new Schema({
  cw_name: {
    type: String
  },
  time: {
    type: String,
    trim: true
  },
  details: {
    type: String
  },
  call_phone: {
    type: String
  },
  length: {
    type: Number
  },
  client_id: {
    type: String
  },
  day: {
    type: String
  },
  month: {
    type: String
  },
  year: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Callout = mongoose.model('Callout', calloutSchema);

module.exports = Callout;
