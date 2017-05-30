const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  boat_id: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    trim: true
  },
  ethnicity: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    trim: true
  },
  address: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
