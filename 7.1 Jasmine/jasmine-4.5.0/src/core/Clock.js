getJasmineRequireObj().Clock = function() {
  /* global process */
  const NODE_JS =
    typeof process !== 'undefined' &&
    process.versions &&
    typeof process.versions.node === 'string';

  /**
   * @class Clock
   * @since 1.3.0
   * @classdesc Jasmine's mock clock is used when testing time dependent code.<br>
   * _Note:_ Do not construct this directly. You can get the current clock with
   * {@link jasmine.clock}.
   * @hideconstructor
   */
  function Clock(global, delayedFunctionSchedulerFactory, mockDate) {
    const realTimingFunctions = {
      setTimeout: global.setTimeout,
      clearTimeout: global.clearTimeout,
      setInterval: global.setInterval,
      clearInterval: global.clearInterval
    };
    const fakeTimingFunctions = {
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setInterval: setInterval,
      clearInterval: clearInterval
    };
    let installed = false;
    let delayedFunctionScheduler;
    let timer;

    this.FakeTimeout = FakeTimeout;

    /**
     * Install the mock clock over the built-in methods.
     * @name Clock#install
     * @since 2.0.0
     * @function
     * @return {Clock}
     */
    this.install = function() {
      if (!originalTimingFunctionsIntact()) {
        throw new Error(
          'Jasmine Clock was unable to install over custom global timer functions. Is the clock already installed?'
        );
      }
      replace(global, fakeTimingFunctions);
      timer = fakeTimingFunctions;
      delayedFunctionScheduler = delayedFunctionSchedulerFactory();
      installed = true;

      return this;
    };

    /**
     * Uninstall the mock clock, returning the built-in methods to their places.
     * @name Clock#uninstall
     * @since 2.0.0
     * @function
     */
    this.uninstall = function() {
      delayedFunctionScheduler = null;
      mockDate.uninstall();
      replace(global, realTimingFunctions);

      timer = realTimingFunctions;
      installed = false;
    };

    /**
     * Execute a function with a mocked Clock
     *
     * The clock will be {@link Clock#install|install}ed before the function is called and {@link Clock#uninstall|uninstall}ed in a `finally` after the function completes.
     * @name Clock#withMock
     * @since 2.3.0
     * @function
     * @param {Function} closure The function to be called.
     */
    this.withMock = function(closure) {
      this.install();
      try {
        closure();
      } finally {
        this.uninstall();
      }
    };

    /**
     * Instruct the installed Clock to also mock the date returned by `new Date()`
     * @name Clock#mockDate
     * @since 2.1.0
     * @function
     * @param {Date} [initialDate=now] The `Date` to provide.
     */
    this.mockDate = function(initialDate) {
      mockDate.install(initialDate);
    };

    this.setTimeout = function(fn, delay, params) {
      return Function.prototype.apply.apply(timer.setTimeout, [
        global,
        arguments
      ]);
    };

    this.setInterval = function(fn, delay, params) {
      return Function.prototype.apply.apply(timer.setInterval, [
        global,
        arguments
      ]);
    };

    this.clearTimeout = function(id) {
      return Function.prototype.call.apply(timer.clearTimeout, [global, id]);
    };

    this.clearInterval = function(id) {
      return Function.prototype.call.apply(timer.clearInterval, [global, id]);
    };

    /**
     * Tick the Clock forward, running any enqueued timeouts along the way
     * @name Clock#tick
     * @since 1.3.0
     * @function
     * @param {int} millis The number of milliseconds to tick.
     */
    this.tick = function(millis) {
      if (installed) {
        delayedFunctionScheduler.tick(millis, function(millis) {
          mockDate.tick(millis);
        });
      } else {
        throw new Error(
          'Mock clock is not installed, use jasmine.clock().install()'
        );
      }
    };

    return this;

    function originalTimingFunctionsIntact() {
      return (
        global.setTimeout === realTimingFunctions.setTimeout &&
        global.clearTimeout === realTimingFunctions.clearTimeout &&
        global.setInterval === realTimingFunctions.setInterval &&
        global.clearInterval === realTimingFunctions.clearInterval
      );
    }

    function replace(dest, source) {
      for (const prop in source) {
        dest[prop] = source[prop];
      }
    }

    function setTimeout(fn, delay) {
      if (!NODE_JS) {
        return delayedFunctionScheduler.scheduleFunction(
          fn,
          delay,
          argSlice(arguments, 2)
        );
      }

      const timeout = new FakeTimeout();

      delayedFunctionScheduler.scheduleFunction(
        fn,
        delay,
        argSlice(arguments, 2),
        false,
        timeout
      );

      return timeout;
    }

    function clearTimeout(id) {
      return delayedFunctionScheduler.removeFunctionWithId(id);
    }

    function setInterval(fn, interval) {
      if (!NODE_JS) {
        return delayedFunctionScheduler.scheduleFunction(
          fn,
          interval,
          argSlice(arguments, 2),
          true
        );
      }

      const timeout = new FakeTimeout();

      delayedFunctionScheduler.scheduleFunction(
        fn,
        interval,
        argSlice(arguments, 2),
        true,
        timeout
      );

      return timeout;
    }

    function clearInterval(id) {
      return delayedFunctionScheduler.removeFunctionWithId(id);
    }

    function argSlice(argsObj, n) {
      return Array.prototype.slice.call(argsObj, n);
    }
  }

  /**
   * Mocks Node.js Timeout class
   */
  function FakeTimeout() {}

  FakeTimeout.prototype.ref = function() {
    return this;
  };

  FakeTimeout.prototype.unref = function() {
    return this;
  };

  return Clock;
};
