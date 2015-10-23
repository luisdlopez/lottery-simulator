var purcahseService = require('./purchase');
var chai = require('chai');
chai.should;

describe('purchase service', function() {

  describe('ticket purchase', function() {

    it('should add 10$ to the current fund', function(done) {

      var appState = { fund: 200 };
      var newAppState = purcahseService.purchaseTicket('Steve', appState);
      newAppState.fund.should.equal(210);
      done();

    });

    it('should add player Steve to the list of players', function(done) {

      var appState = { players: [] };
      var newAppState = purcahseService.purchaseTicket('Steve', appState);
      newAppState.players.should.eql(['Steve']);
      done();

    });

    it('should not change app state when 50 players have already purchased a ticket', function(done) {

      var mockPlayers = require('./../mock.players.json');
      var appState = {
        fund: 200,
        players: mockPlayers
      };
      var newAppState = purcahseService.purchaseTicket('Unlucky Player', appState);
      newAppState.fund.should.equal(200);
      newAppState.players.should.eql(mockPlayers);
      done()

    });

    it('should add 10$ and player Steve to a new app state', function(done) {

      var appState = {};
      var newAppState = purcahseService.purchaseTicket('Steve', appState);
      newAppState.fund.should.equal(10);
      newAppState.players.should.eql(['Steve']);
      done()

    });

    it('should add 10$ and player Steve to an undefined app state', function(done) {

      var newAppState = purcahseService.purchaseTicket('Steve');
      newAppState.fund.should.equal(10);
      newAppState.players.should.eql(['Steve']);
      done()

    });

  })

});