var Factory, assertType, clampValue;

require("lotus-require");

assertType = require("type-utils").assertType;

clampValue = require("clampValue");

Factory = require("factory");

module.exports = Factory("Timer", {
  initArguments: function(delay, callback) {
    assertType(delay, Number);
    assertType(callback, Function);
    return arguments;
  },
  customValues: {
    isActive: {
      get: function() {
        return this._id != null;
      }
    },
    elapsedTime: {
      get: function() {
        var finished;
        finished = this._finished;
        if (finished == null) {
          finished = Date.now();
        }
        return finished - this._began;
      }
    },
    progress: {
      get: function() {
        var progress;
        progress = this.elapsedTime / this.delay;
        return clampValue(progress, 0, 1);
      }
    }
  },
  initFrozenValues: function(delay) {
    return {
      delay: delay
    };
  },
  initValues: function(delay, callback) {
    return {
      _began: null,
      _id: null,
      _callback: (function(_this) {
        return function() {
          if (_this._id == null) {
            return;
          }
          _this._id = null;
          _this._finished = Date.now();
          return callback();
        };
      })(this)
    };
  },
  init: function() {
    this._began = Date.now();
    return this._id = setTimeout(this._callback, this.delay);
  },
  prevent: function() {
    if (this._id == null) {
      return;
    }
    clearTimeout(this._id);
    this._id = null;
    this._finished = Date.now();
  }
});

//# sourceMappingURL=../../map/src/Timer.map
