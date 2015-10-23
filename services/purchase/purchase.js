var _ = require('lodash');
var constants = require('./../constants');

function purchaseTicket(playerName, currentAppState) {

  var defaultAppState = {
    fund: 0,
    players: []
  };

  var newAppState = _.merge(defaultAppState, currentAppState);

  if (newAppState.players.length < constants.LIMIT_NUMBER_OF_PLAYERS) {

    newAppState.fund += constants.TICKET_PRICE;
    newAppState.players.push(playerName);
  }

  return newAppState;
}

module.exports = {
  purchaseTicket: purchaseTicket
};