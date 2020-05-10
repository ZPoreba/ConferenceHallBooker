var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ConferenceHallBooker';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var User = require('../schemas/user.js');


function sendRecords(res, values_of_fields, projected_fields) {

  let db_query = {};

  for (var key in values_of_fields) {
    var value = Number(values_of_fields[key]);
    if (isNaN(value)) {
      value = values_of_fields[key];
    }

    if(Array.isArray(value)) {

      value.forEach((val, index) => {
        var tmp = Number(value[index]);
        if (!isNaN(tmp)) {
          value[index] = tmp;
        }
      });

      db_query[key] = {"$in":value};
    }
    else {
      db_query[key] = value;
    }
  }

  var or_array = [];
  or_array.push(db_query);
  var final_db_query = {$or: or_array};

  User.find(final_db_query, projected_fields, (err, items) => {
    
    if(items === undefined || items.length === 0) {
      res.status(400);
      res.end();
      return;
    }
    res.status(200);
    res.send(items);
    res.end();

  });

}

/* GET users listing. */
router.get('/', function(req, res, next) {

  var projected_fields = {_id: 0};
  var values_of_fields = req.query;
  sendRecords(res, values_of_fields, projected_fields);

});

/* POST new proxy user. */
router.post('/', async function(req, res, next) {
  var user = req.query;
  
  var newId = await User.findOne().sort({id:-1});
  newId = Number(newId.id) + 1;
  user["id"] = newId;

  user = new User(user, { _id: false });
  user.save();
  
  res.status(200);
  res.send(user);
  res.end();
});

module.exports = router;
