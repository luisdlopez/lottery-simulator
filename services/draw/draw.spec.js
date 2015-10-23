var drawService = require('./draw');
var _ = require('lodash');
var chai = require('chai');
var expect = chai.expect;
chai.should();

describe('draw service', function() {

  describe('draw winning balls', function() {

    it('should return an array with 3 items', function(done) {

      var winners = drawService.drawWinningBalls();

      expect(winners).to.be.a('array');
      winners.length.should.equal(3);

      done();

    });

    it('should return 3 different numbers between 0 and 49', function(done) {

      // Since it's randomly generated, test it more than once
      for (var i = 0; i < 1000; i++) {

        var winners = drawService.drawWinningBalls();

        expect(winners[0]).to.be.within(0, 49);
        expect(winners[1]).to.be.within(0, 49);
        expect(winners[2]).to.be.within(0, 49);

      }

      done();

    });

    it('should return 3 unique numbers', function(done) {

      // Since it's randomly generated, test it more than once
      for (var i = 0; i < 1000; i++) {

        var winners = drawService.drawWinningBalls();

        _.uniq(winners).length.should.equal(3);

      }

      done();

    });

  });

  describe('trigger draw - winners', function() {

    var mockPlayers = require('./../mock.players.json');

    it('should update the app state with 3 winners when a draw ' +
      'is triggered and 50 players have bought tickets', function(done) {

      var appState = {
        fund: 200,
        players: mockPlayers
      };

      var newAppState = drawService.draw(appState);

      newAppState.winners.length.should.equal(3);

      done();

    });

    it('should update the app state with 3 winners, all having a ' +
      'name and prize property', function(done) {

      var appState = {
        fund: 200,
        players: mockPlayers
      };

      var newAppState = drawService.draw(appState);

      expect(newAppState.winners[0]).to.have.property('name');
      expect(newAppState.winners[0]).to.have.property('prize');
      expect(newAppState.winners[1]).to.have.property('name');
      expect(newAppState.winners[1]).to.have.property('prize');
      expect(newAppState.winners[2]).to.have.property('name');
      expect(newAppState.winners[2]).to.have.property('prize');

      done();

    });

    it('should update the app state with 3 undefined winners when a draw ' +
      'is triggered and no players have bought tickets', function(done) {

      var appState = {
        fund: 200,
        players: []
      };

      var newAppState = drawService.draw(appState);

      newAppState.winners.length.should.equal(3);
      newAppState.winners.should.eql([
        {
          name: null,
          prize: 75
        },
        {
          name: null,
          prize: 15
        },
        {
          name: null,
          prize: 10
        }
      ]);

      done();

    });

    it('should update the app state with 3 undefined winners when a draw ' +
      'is triggered and the app state is undefined', function(done) {

      var newAppState = drawService.draw();

      newAppState.winners.length.should.equal(3);
      newAppState.winners.should.eql([
        {
          name: null,
          prize: null
        },
        {
          name: null,
          prize: null
        },
        {
          name: null,
          prize: null
        }
      ]);

      done();

    });

  });

  describe('trigger draw - players', function() {

    var mockPlayers = require('./../mock.players.json');

    it('should reset the number of players after a draw is triggered', function(done) {

      var appState = {
        fund: 200,
        players: mockPlayers
      };

      var newAppState = drawService.draw(appState);

      newAppState.players.length.should.equal(0);

      done();

    });

  });

  describe('trigger draw - updated fund', function() {

    var mockPlayers = require('./../mock.players.json');

    it('should substract 10$ to the 200$ fund be cause only the ' +
      '3rd winning ball was purchased by a player', function(done) {

        var oldFund = 200;
        var winners = [
          {
            name: null,
            prize: 75
          },
          {
            name: null,
            prize: 15
          },
          {
            name: 'Steve',
            prize: 10
          }
        ];

        var newFund = drawService.getUpdatedFund(winners, oldFund);

        newFund.should.equal(oldFund - 10);

        done();

      });

    it('should substract 15$ to the 200$ fund be cause only the ' +
      '2nd winning ball was purchased by a player', function(done) {

        var oldFund = 200;
        var winners = [
          {
            name: null,
            prize: 75
          },
          {
            name: 'Steve',
            prize: 15
          },
          {
            name: null,
            prize: 10
          }
        ];

        var newFund = drawService.getUpdatedFund(winners, oldFund);

        newFund.should.equal(oldFund - 15);

        done();

      });

      it('should substract 75$ to the 200$ fund be cause only the ' +
        '1st winning ball was purchased by a player', function(done) {

          var oldFund = 200;
          var winners = [
            {
              name: 'Steve',
              prize: 75
            },
            {
              name: null,
              prize: 15
            },
            {
              name: null,
              prize: 10
            }
          ];

          var newFund = drawService.getUpdatedFund(winners, oldFund);

          newFund.should.equal(oldFund - 75);

          done();

        });

      it('should substract 100$ to the 200$ fund be cause all ' +
        'winning balls were purchased by players', function(done) {

          var oldFund = 200;
          var winners = [
            {
              name: 'Steve',
              prize: 75
            },
            {
              name: 'Alex',
              prize: 15
            },
            {
              name: 'Tom',
              prize: 10
            }
          ];

          var newFund = drawService.getUpdatedFund(winners, oldFund);

          newFund.should.equal(oldFund - 100);

          done();

        });
  });

});
