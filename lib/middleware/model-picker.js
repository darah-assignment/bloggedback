'use strict';

const users = require('../models/user/user-model.js');
const blogs = require('../models/blog/blog-model.js');

function pickModel(req, res, next) {
  const model = req.params.model;
  switch (model) {
    case 'users':
      req.model = users;
      next();
      return;
    case 'blogs':
      req.model = blogs;
      next();
      return;
    default:
      next('Model Invalid. Please pick a valid model: <users> or <blogs>.');
      return;
  }
}

module.exports = pickModel;
