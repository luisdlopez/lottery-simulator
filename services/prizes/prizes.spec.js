var prizesService = require('./prizes');
var _ = require('lodash');
var chai = require('chai');
chai.should();

describe('prizes service', function() {

  describe('first place winner', function() {

    it('should return 75$ for a 200$ fund', function(done) {

      var fund = 200;
      var prize = prizesService.getAmountForFirstPrize(fund);
      prize.should.equal(75);
      done();

    });

    it('should return 56$ (55.5$ rounded) for a 148 fund', function(done) {

      var fund = 148;
      var prize = prizesService.getAmountForFirstPrize(fund);
      prize.should.equal(56);
      done();

    });

    it('should return 55$ (55.125$ rounded) for a 147$ fund', function(done) {

      var fund = 147;
      var prize = prizesService.getAmountForFirstPrize(fund);
      prize.should.equal(55);
      done();

    });

  });

  describe('second place winner', function() {

    it('should return 15$ for a 200$ fund', function(done) {

      var fund = 200;
      var prize = prizesService.getAmountForSecondPrize(fund);
      prize.should.equal(15);
      done();

    });

    it('should return 11$ (11.1$ rounded) for a 148 fund', function(done) {

      var fund = 148;
      var prize = prizesService.getAmountForSecondPrize(fund);
      prize.should.equal(11);
      done();

    });

    it('should return 17$ (16.5$ rounded) for a 220$ fund', function(done) {

      var fund = 220;
      var prize = prizesService.getAmountForSecondPrize(fund);
      prize.should.equal(17);
      done();

    });

  });

  describe('third place winner', function() {

    it('should return 10$ for a 200$ fund', function(done) {

      var fund = 200;
      var prize = prizesService.getAmountForThirdPrize(fund);
      prize.should.equal(10);
      done();

    });

    it('should return 10$ (10.05$ rounded) for a 201 fund', function(done) {

      var fund = 201;
      var prize = prizesService.getAmountForThirdPrize(fund);
      prize.should.equal(10);
      done();

    });

    it('should return 11$ (10.5$ rounded) for a 210$ fund', function(done) {

      var fund = 210;
      var prize = prizesService.getAmountForThirdPrize(fund);
      prize.should.equal(11);
      done();

    });

  });

});