'use strict';


var mongoose = require('mongoose'),
  State = mongoose.model('daydreamState');

exports.list_all_states = function(req, res) {
  State.find({}, function(err, state) {
    if (err)
      res.send(err);
    res.json(state);
  });
};

exports.create_a_state = function(req, res) {
  var new_state = new State(req.body);
  new_state.save(function(err, state) {
    if (err)
      res.send(err);
    res.json(state);
  });
};

exports.update_a_state = function(req, res) {
  State.findOneAndUpdate({_id: req.params.stateId}, req.body, {new: true}, function(err, state) {
    if (err)
      res.send(err);
    res.json(state);
  });
};

exports.read_a_state = function(req, res) {
  State.findById(req.params.stateId, function(err, state) {
    if (err)
      res.send(err);
    res.json(state);
  });
};

exports.root = function(req, res) {
  res.json('hi');
};
