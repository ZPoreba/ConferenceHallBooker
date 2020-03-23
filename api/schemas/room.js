var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema(
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      id: {type: Number, autopopulate: true},
      name: {type: String, required: true},
      price: {type: Number, required: true},
      capacity: {type: Number, required: true},
      area: {type: Number, required: true},
      details: {type: String}
    },
    { collection : 'Rooms' }
  );

  module.exports = mongoose.model('Room', RoomSchema); 