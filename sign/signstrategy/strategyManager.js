const giftStrategy = require('./giftStrategy');
const noGiftStrategy = require('./noGiftStrategy');

const strategyManager = {
  strategies: new Map(),

  init: function() {
    this.strategies.set(2, giftStrategy);
    this.strategies.set(1, noGiftStrategy);
  },

  getStrategy: function(state) {
    return this.strategies.get(state);
  }
};

module.exports = strategyManager;