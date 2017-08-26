'use strict';
module.exports = function(app) {
  var State = require('../controllers/vrController');

  app.route('/state')
    .get(State.list_all_states)
    .post(State.create_a_state);;

  app.route('/stateById/:stateId')
  	.get(State.read_a_state)
  	.put(State.update_a_state);

  app.route('/')
    .get(State.root);
};
