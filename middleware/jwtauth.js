const jwt = require('jwt-simple');
const jwtTokenSecret = require('../config/constant').jwtTokenSecret;
const User = require('../models/user');

function jwtauth(req, res, next) {
  const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['authorization'];
  if (token) {
    try {
      let decoded = jwt.decode(token, jwtTokenSecret);
      if (decoded.exp <= Date.now()) {
        res.end('Access token has expired', 400);
      }
      User.findOne({_id: decoded.iss})
        .then(user => {
          req.user = user;
          next();
        });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
}

module.exports = jwtauth;
