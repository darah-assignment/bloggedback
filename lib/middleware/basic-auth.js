'use strict';

const base64 = require('base-64');
const user_model = require('../models/user/user-model.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid User (no hdr auth)');
  } else {
    const basic = req.headers.authorization.split(' ').pop();
    const [username, password] = base64.decode(basic).split(':');
    const userInfo = { username: username, password: password };
    user_model
      .basicAuth(userInfo)
      .then(validUser => {
        if (validUser) {
          req.token = user_model.generateToken(validUser[0]);
          next();
        } else {
          next('Invalid User (wrong credentials)');
        }
      })
      .catch(err => next(err.message));
  }
};
