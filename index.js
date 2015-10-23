var readline = require('readline');
var actions = require('./services/actions');
var messages = require('./services/messages');
var constants = require('./services/constants');

var appState = {
  players: [],
  fund: 200,
  winners: []
};

console.log(messages.WELCOME_MESSAGE);
console.log(messages.INSTRUCTIONS);
console.log(messages.CURRENT_FUND, appState.fund);

var rl = readline.createInterface(process.stdin, process.stdout);

function getCommand() {

  rl.setPrompt('\n> ');
  rl.prompt();
}

getCommand();

rl.on('line', function(line) {

  var words = line.toLowerCase().split(' ');
  var command = words[0].toLowerCase();

  switch (command) {

    case constants.PURCHASE_COMMAND:

      if (words.length === 2 && words[1]) {

        appState = actions.purchase(words[1], appState);

      } else {

        console.error(messages.PURCHASE_ERROR);
      }

      break;

    case constants.DRAW_COMMAND:

      appState = actions.draw(appState);

      break;

    case constants.WINNERS_COMMAND:

      if (appState.winners.length === 3) {

        actions.displayWinners(appState);
      } else {

        console.log(messages.WINNERS_ERROR);
      }

      break;

    case constants.EXIT_COMMAND:

      console.log(messages.GOODBYE);
      process.exit(0);

      break;

    default:

      console.error(messages.COMMAND_NOT_RECOGNIZED);
      console.log(messages.INSTRUCTIONS);

      break;
  }

  getCommand();

});
