module.exports = Object.freeze({
  WELCOME_MESSAGE: '\nWelcome to Fidem Lottery.\n',
  INSTRUCTIONS:
    '\n- To purchase a ticket write Purchase, followed by the player\'s name (for example, Purchase Steve)\n' +
    '- To trigger a draw write Draw\n' +
    '- To display latest winners write Winners\n' +
    '- To exit the program write Exit',
  PURCHASE_CONFIRMATION: '\nBall number for %s: %s',
  ALL_TICKETS_SOLD: '\nAll tickets for next draw have been purchased.',
  DRAW_CONFIRMATION: '\nThe following balls were drawn: %s %s %s',
  CURRENT_FUND: '\nFund is now at %s$',
  WINNERS_ERROR: '\nYou must draw first',
  PURCHASE_ERROR: '\n- To purchase a ticket write Purchase, followed by the player\'s name (for example, Purchase Steve)',
  COMMAND_NOT_RECOGNIZED: '\nCommand not recognized',
  GOODBYE: '\nGoodbye!\n',
  FIRST_BALL: '1st Ball',
  SECOND_BALL: '2nd Ball',
  THIRD_BALL: '3rd Ball',
  GET_WINNER: function(winner) {
    return (winner.name || '-') + ' : ' + winner.prize + '$';
  }
});