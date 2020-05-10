var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/ConferenceHallBooker';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Reservation = require('../schemas/reservation.js');
var Room = require('../schemas/room.js');


function getQuery(type, values_of_fields) {
    if (type === "regular") {
        mongo_key = "$in";
    }
    else {
        mongo_key = "$all";
    }

    let db_query = {};
  
    for (var key in values_of_fields) {
      var value;
      if (type !== "regular") {
        value = JSON.parse(values_of_fields[key]);    
      }
      else {
        value = values_of_fields[key];
      }

      value = Number(value);
      if (isNaN(value)) {
        if (type !== "regular") {
            value = JSON.parse(values_of_fields[key]);    
        }
        else {
            value = values_of_fields[key];
        }
      }
  
      if(Array.isArray(value)) {
  
        value.forEach((val, index) => {
          var tmp = Number(value[index]);
          if (!isNaN(tmp)) {
            value[index] = tmp;
          }
        });
  
        db_query[key] = {};
        db_query[key][mongo_key] = value;
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

function sendRecords(type, res, values_of_fields, projected_fields) {

    var final_db_query = getQuery(type, values_of_fields);
  
    Reservation.find(final_db_query, projected_fields, (err, items) => {
      
      if(items.length === 0) {
        res.status(400);
        res.end();
        return;
      }
      res.status(200);
      res.send(items);
      res.end();
  
    });
  
  }

/* GET reservations listing. */
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

/* POST new reservation. */
router.post('/', async function(req, res, next) {
  var reservation = req.query;
  
  var newId = await Reservation.findOne().sort({id:-1});
  newId = Number(newId.id) + 1;
  reservation["id"] = newId;
  if (reservation["additional_services"] !== undefined) {
    reservation["additional_services"] = JSON.parse(reservation["additional_services"]); 
  }

  reservation = new Reservation(reservation, { _id: false });
  reservation.save();

  var roomId = parseInt(reservation['room_id']);
  Room.update({id: roomId}, 
              { $push: { reservations: newId } },
              function(err, result) {
                console.log(result);
              })
  
  res.status(200);
  res.send(reservation);
  res.end();
});

/* PUT edit reservation. */
router.put('/', async function(req, res, next) {
  var reservation = req.query;
  var id = reservation.id;
  delete reservation['id'];

  if (reservation.additional_services !== undefined)
    reservation.additional_services = JSON.parse(reservation.additional_services);
  
  Reservation.update({id: id}, 
              reservation,
              function(err, result) {
                console.log(result);

                if (!err) {
                  res.status(200);
                  res.send({status: "ok"});
                  res.end();
                }
                else {
                  res.status(400);
                  res.send({status: "error"});
                  res.end();
                }

              });
});

/* DELETE delete reservation. */
router.delete('/', async function(req, res, next) {
  var reservation = req.query;

  var roomId = parseInt(reservation['room_id']);
  Room.update({id: roomId}, 
              { $pop: { reservations: reservation.id } },
              function(err, result) {
                console.log(result);
              })


  Reservation.remove({ id: reservation.id }, function(err) {
      if (!err) {
        res.status(200);
        res.send({status: "ok"});
        res.end();
      }
      else {
        res.status(400);
        res.send({status: "error"});
        res.end();
      }
  });

});

module.exports = router;
