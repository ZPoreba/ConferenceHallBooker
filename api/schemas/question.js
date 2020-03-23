var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      id: {type: Number, autopopulate: true},
      question: {type: String, required: true},
      answer: {type: String, required: true}
    },
    { collection : 'FAQ' }
  );

  module.exports = mongoose.model('Question', QuestionSchema); 