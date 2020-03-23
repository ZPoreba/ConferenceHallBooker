var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema(
    {
      id: {type: Number, autopopulate: true},
      from: {type: Date, required: true},
      to: {type: Date, required: true},
      user_id: {type: Number, required: true},
      room_id: {type: Number, required: true},
      additional_services: [String],
      price: {type: Number, required: true},
      status: {type: String, required: true},
      cancelation_reason: {type: String}
    },
    { 
      collection : 'Reservations',
      versionKey: false
    }
  );

  module.exports = mongoose.model('Reservation', ReservationSchema); 