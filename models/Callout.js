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
  }
})

const Callout = mongoose.model('Callout', clientSchema);

module.exports = Callout;
