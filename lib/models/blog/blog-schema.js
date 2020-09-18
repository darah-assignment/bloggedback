'use strict';

const mongoose = require('mongoose');
const blogs = mongoose.Schema(
  {
    blogger: { type: String, required: true },
    blogtitle: { type: String, required: true },
    blogbody: { type: String, required: true },
    date: { type: String },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

module.exports = mongoose.model('blogs', blogs);
