const { performance } = require("perf_hooks");
const addOn = require("./build/Release/addon");
const normalJs = require("./jsTests");

module.exports = class Runner {
  run(testName, params, { js = true, cpp = true } = {}) {
    const time = {};
    const result = {};
    // CPP Test
    if (cpp) {
      const start = performance.now();
      const resultCpp = addOn[testName](...params);
      const diffCpp = performance.now() - start;
      const cpp = diffCpp.toFixed(4) + " ms";
      time.cpp = cpp;
      result.cpp = resultCpp;
    }

    // JS Test
    if (js) {
      const start = performance.now();
      const resultJs = normalJs[testName](...params);
      const diffJs = performance.now() - start;
      const js = diffJs.toFixed(4) + " ms";
      time.js = js;
      result.js = resultJs;
    }
    return {
      time,
      result,
    };
  }
};
