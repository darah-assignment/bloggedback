'use strict';

const mongoose = require('mongoose');
const roles = mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'writer'],
    default: 'writer',
  },
  capabilities: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('roles', roles);
