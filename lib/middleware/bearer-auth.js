'use strict';
const user_model = require('../models/user/user-model.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid User (no hdr auth)');
  } else {
    const [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
      user_model
        .authenticateToken(token)
        .then(validUser => {
          req.user = validUser;          
          next();
        })
        .catch(err => next(err.message));
    }
  }
};
