'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var daydreamState = new Schema({
  moved: {
    type: Boolean,
    required: ''
  }
});

module.exports = mongoose.model('daydreamState', daydreamState);
