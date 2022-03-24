const mongoose = require('mongoose');

const userObj = {
  mobile: {
    type: String,
    lowercase: true,
    required: true,
  },
  dob: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String
  },
  occupation: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  preferredLanguage: {
    type: String
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
};

const userSchema = new mongoose.Schema(userObj);
module.exports = {
  usersModel: mongoose.model('users', userSchema),
  userObj
};