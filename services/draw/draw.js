var _ = require('lodash');
var constants = require('./../constants');
var prizesService = require('./../prizes/prizes');
var prizeFunctions = [
  prizesService.getAmountForFirstPrize,
  prizesService.getAmountForSecondPrize,
  prizesService.getAmountForThirdPrize
];

/**
 *
 * @returns {Array}: 3 unique numbers between 0 and 49
 */
function drawWinningBalls() {

  var balls = _.range(constants.BALLS_RANGE_START, constants.BALLS_RANGE_END);
  return _.sample(balls, constants.NUMBER_OF_WINNERS);
}

/**
 *
 * @param {Array} winningBalls: 3 unique numbers between 0 and 49
 * @param {Object} appState
 * @returns {Function}: to be used in iteration, return an object representing a winner of the draw
 */
function getWinnerFactory(winningBalls, appState) {

  return function(getPrizeAmount, index) {

    return {
      name: appState.players[winningBalls[index]] || null,
      prize: getPrizeAmount(appState.fund) || null
    };
  };
}

/**
 * To be used in iteration (particularly in a reducer)
 * Adds the total of claimed winnings - if a drawn ball was not purchased by
 * a player, the winning amount is not added to the winnings total
 *
 * @param {number} total
 * @param {Object} winner
 * @returns {number}: claimed winnings total
 */
function totalWinnings(total, winner) {

  if (winner.name === null) {

    return total;
  } else {

    return total + winner.prize;
  }
}

/**
 * Based on the winners given, returns the newly updated funds
 *
 * @param {Object} winners
 * @param {number} fund
 * @returns {number}
 */
function getUpdatedFund(winners, fund) {

  return fund - _.reduce(winners, totalWinnings, 0);
}

/**
 * Update the appState after a draw
 *    Set winning balls
 *    Set winners
 *    Reset players
 *    Update funds
 *
 * @param {Object] currentAppState
 * @param {Array} winningBalls
 * @returns {Object} newAppState
 */
function getUpdatedAppStateAfterDraw(currentAppState, winningBalls) {

  var defaultAppState = {
    players: [],
    winners: []
  };

  var newAppState = _.merge(defaultAppState, currentAppState);

  var winnerFactory = getWinnerFactory(winningBalls, newAppState);

  newAppState.winningBalls = winningBalls;
  newAppState.winners = _.map(prizeFunctions, winnerFactory);
  newAppState.players = [];
  newAppState.fund = getUpdatedFund(newAppState.winners, newAppState.fund);

  return newAppState;

}

function draw(currentAppState) {

  var winningBalls = drawWinningBalls();

  var newAppSate = getUpdatedAppStateAfterDraw(currentAppState, winningBalls);

  return newAppSate;

}

module.exports = {
  drawWinningBalls: drawWinningBalls,
  getUpdatedFund: getUpdatedFund,
  draw: draw
};
