var purchaseService = require('./purchase/purchase');
var drawService = require('./draw/draw');
var messages = require('./messages');
var Table = require('cli-table');

function purchase(playerName, appState) {

  if (appState.players.length === 50) {

    console.log(messages.ALL_TICKETS_SOLD);
    return appState;
  }

  var newAppState = purchaseService.purchaseTicket(playerName, appState);

  console.log(messages.PURCHASE_CONFIRMATION, playerName, newAppState.players.length);
  console.log(messages.CURRENT_FUND, newAppState.fund);

  return newAppState;
}

function draw(appState) {

  var newAppState = drawService.draw(appState);

  console.log(
    messages.DRAW_CONFIRMATION,
    (newAppState.winningBalls[0] + 1),
    (newAppState.winningBalls[1] + 1),
    (newAppState.winningBalls[2] + 1)
  );

  console.log(messages.CURRENT_FUND, newAppState.fund);

  return newAppState;
}

function displayWinners(appState) {

  var table = new Table({
    head: [
      messages.FIRST_BALL,
      messages.SECOND_BALL,
      messages.THIRD_BALL
    ]
  });

  table.push([
    messages.GET_WINNER(appState.winners[0]),
    messages.GET_WINNER(appState.winners[1]),
    messages.GET_WINNER(appState.winners[2])
  ]);

  console.log('\n' + table.toString());
}

module.exports = {
  purchase: purchase,
  draw: draw,
  displayWinners: displayWinners
};