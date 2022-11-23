getJasmineRequireObj().util = function(j$) {
  const util = {};

  util.isUndefined = function(obj) {
    return obj === void 0;
  };

  util.clone = function(obj) {
    if (Object.prototype.toString.apply(obj) === '[object Array]') {
      return obj.slice();
    }

    const cloned = {};
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        cloned[prop] = obj[prop];
      }
    }

    return cloned;
  };

  util.cloneArgs = function(args) {
    return Array.from(args).map(function(arg) {
      const str = Object.prototype.toString.apply(arg),
        primitives = /^\[object (Boolean|String|RegExp|Number)/;

      // All falsey values are either primitives, `null`, or `undefined.
      if (!arg || str.match(primitives)) {
        return arg;
      } else if (str === '[object Date]') {
        return new Date(arg.valueOf());
      } else {
        return j$.util.clone(arg);
      }
    });
  };

  util.getPropertyDescriptor = function(obj, methodName) {
    let descriptor,
      proto = obj;

    do {
      descriptor = Object.getOwnPropertyDescriptor(proto, methodName);
      proto = Object.getPrototypeOf(proto);
    } while (!descriptor && proto);

    return descriptor;
  };

  util.has = function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };

  util.errorWithStack = function errorWithStack() {
    // Don't throw and catch. That makes it harder for users to debug their
    // code with exception breakpoints, and it's unnecessary since all
    // supported environments populate new Error().stack
    return new Error();
  };

  function callerFile() {
    const trace = new j$.StackTrace(util.errorWithStack());
    return trace.frames[2].file;
  }

  util.jasmineFile = (function() {
    let result;

    return function() {
      if (!result) {
        result = callerFile();
      }

      return result;
    };
  })();

  util.validateTimeout = function(timeout, msgPrefix) {
    // Timeouts are implemented with setTimeout, which only supports a limited
    // range of values. The limit is unspecified, as is the behavior when it's
    // exceeded. But on all currently supported JS runtimes, setTimeout calls
    // the callback immediately when the timeout is greater than 2147483647
    // (the maximum value of a signed 32 bit integer).
    const max = 2147483647;

    if (timeout > max) {
      throw new Error(
        (msgPrefix || 'Timeout value') + ' cannot be greater than ' + max
      );
    }
  };

  return util;
};
