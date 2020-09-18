'use strict';

const mongoose = require('mongoose');
const roles = mongoose.Schema(
  {
    role: {
      type: String,
      required:true,
    },
    capabilities: {
      type: [String],
      required: true,
      enum: ['read', 'create', 'update', 'delete'],
      default: ['read', 'create'],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model('roles', roles);
