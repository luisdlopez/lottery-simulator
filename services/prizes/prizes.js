var _ = require('lodash');
var constants = require('./../constants');

function getAmountForFirstPrize(fund) {

  return Math.round(
    fund *
    constants.FUND_PERCENTAGE *
    constants.FIRST_PRIZE_PERCENTAGE
  );
}

function getAmountForSecondPrize(fund) {

  return Math.round(
    fund *
    constants.FUND_PERCENTAGE *
    constants.SECOND_PRIZE_PERCENTAGE
  );
}

function getAmountForThirdPrize(fund) {

  return Math.round(
    fund *
    constants.FUND_PERCENTAGE *
    constants.THIRD_PRIZE_PERCENTAGE
  );
}

module.exports = {
  getAmountForFirstPrize: getAmountForFirstPrize,
  getAmountForSecondPrize: getAmountForSecondPrize,
  getAmountForThirdPrize: getAmountForThirdPrize
};