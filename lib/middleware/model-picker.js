'use strict';

const user_model = require('../models/user/user-model.js');
const blog_model = require('../models/blog/blog-model.js');
const role_model = require('../models/role/role-model.js');

function pickModel(req, res, next) {
  const model = req.params.model;
  switch (model) {
    case 'users':
      req.model = user_model;
      next();
      return;
    case 'blogs':
      req.model = blog_model;
      next();
      return;
    case 'roles':
      req.model = role_model;
      next();
      return;
    default:
      next('Model Invalid. Please pick a valid model: <users> or <blogs>.');
      return;
  }
}

module.exports = pickModel;
