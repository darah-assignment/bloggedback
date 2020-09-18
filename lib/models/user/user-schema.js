'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const roles = require('../role/role-model.js');
const blogs = require('../blog/blog-model.js');
const user = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'writer', enum: ['admin', 'writer'] },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

user.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

user.virtual('blogs', {
  ref: 'blogs',
  localField: 'username',
  foreignField: 'blogger',
  justOne: false,
});

user.pre('find', function () {
  this.populate('blogs');
});

user.virtual('capabilities', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'role',
  justOne: true,
});

user.pre('find', function () {
  this.populate('capabilities');
});

user.post('save', async function () {
  await this.populate('capabilities').execPopulate();
});

module.exports = mongoose.model('user', user);
