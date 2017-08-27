'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var daydreamState = new Schema({
  moving: {
    type: Boolean,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  z: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('daydreamState', daydreamState);
