/**
 * 键盘策略
*/
const ICBCkeyBoardStrategy = require('./ICBCkeyBoardStrategy.js');
const WeChatkeyBoardStrategy = require('./WechatkeyBoardStrategy.js');

const KeyboardStrategyManager = {
  strategies: new Map(),

  init: function() {
    this.strategies.set("工行", ICBCkeyBoardStrategy);
    this.strategies.set("微信", WeChatkeyBoardStrategy);
  },

  getStrategy: function(state) {
    return this.strategies.get(state);
  }
};

module.exports = KeyboardStrategyManager;