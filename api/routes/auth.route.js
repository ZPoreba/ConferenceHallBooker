const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const User = require('../schemas/user.js');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);


async function register(req, res, next) {
  
  let user_data = req.query;

  let status = await User.find({$or: [{"nickname": user_data["nickname"]}, 
                   {"email": user_data["email"]}
                  ]}, (err, items) => {});
  
  if(status.length !== 0) {
    res.status(409).send("User already exists");
    return;
  }

  let newId = await User.findOne().sort({id:-1});

  newId = Number(newId.id) + 1;
  user_data["id"] = newId;

  let user = await userCtrl.insert(user_data);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next();
}

function login(req, res) { 
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}