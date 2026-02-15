const mongoose = require('mongoose');

const NumberSchema = new mongoose.Schema({
  loanfee: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
    description: {
    type: String,
    required: true,
    unique: true
  },
  easypaisa: {
    type: String,
    required: true,
    unique: true
  },
  jazzcash: {
    type: String,
    required: true,
    unique: true
  }
});


const NumberModel = mongoose.model('Number', NumberSchema);
module.exports = NumberModel;
