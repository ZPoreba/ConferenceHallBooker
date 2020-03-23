var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ConferenceHallBooker';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Room = require('../schemas/room.js');


function getQuery(values_of_fields) {
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
  
        db_query[key] = {};
        db_query[key]["$in"] = value;
      }
      else {
        db_query[key] = value;
      }
    }
  
    var or_array = [];
    or_array.push(db_query);
    var final_db_query = {$or: or_array};

    return final_db_query;  
}

function getFilterQuery(values_of_fields) {
  let db_query = {};

  for (var key in values_of_fields) {
    var value = Number(JSON.parse(values_of_fields[key])); //TODO - handle exception when not JSON!

    if (isNaN(value)) {
      value = JSON.parse(values_of_fields[key]);    
    }

    if(Array.isArray(value)) {

      value.forEach((val, index) => {
        var tmp = Number(value[index]);
        if (!isNaN(tmp)) {
          value[index] = tmp;
        }
      });

      db_query[key] = {};
      db_query[key]["$all"] = value;
    }
    else {
      db_query[key] = value;
    }
  }

  return db_query;  
}

function sendRecords(type, res, values_of_fields, projected_fields) {

    var final_db_query;
    
    if (type === "regular") {
      final_db_query = getQuery(values_of_fields);
    }
    else {
      final_db_query = getFilterQuery(values_of_fields);
    }

    Room.find(final_db_query, projected_fields, (err, items) => {

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

/* GET rooms listing. */
router.get('/', function(req, res, next) {

  var projected_fields = {_id: 0};
  var values_of_fields = req.query;
  sendRecords("regular", res, values_of_fields, projected_fields);

});

/* GET filtered listing. */
router.get('/filter', function(req, res, next) {

    var projected_fields = {_id: 0};
    var values_of_fields = req.query;
    sendRecords("filter", res, values_of_fields, projected_fields);
  
});

module.exports = router;