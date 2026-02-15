const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  job:{
    type: String,
    required: true
  },
  cnicNumber:{
    type: String,
    required: true
  },
  status:{
    type: String,
    default: "Pending"
  },
  country:{
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  passportFrontImage: {
    type: String, // Store image URL or base64 string
    required: true
  },
  passportBackImage: {
    type: String, // Store image URL or base64 string
    required: true
  },
  frontCnic: {
    type: String, // Store image URL or base64 string
    required: true
  },
  backCnic: {
    type: String, // Store image URL or base64 string
    required: true
  },
  passportSizePhotoImage: {
    type: String, // Store image URL or base64 string
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User; 
