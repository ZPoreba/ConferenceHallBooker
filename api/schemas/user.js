var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
      id: {type: Number, autopopulate: true},
      nickname: {type: String, required: true},
      first_name: {type: String, required: true},
      last_name: {type: String, required: true},
      birth_date: {type: Date, required: true},
      email: {type: String, required: true},
      phone: {type: String},
      hashedPassword: {type: String, required: true},
      is_admin: {type: Boolean, default: false},
      is_proxy: {type: Boolean, default: false},
      subusers: [Number],
      confirmed: {type: Boolean, default: false},
    },
    { 
      collection : 'Users',
      versionKey: false
    }
  );

  module.exports = mongoose.model('User', UserSchema); 