module.exports = function(config) {
  config.set({

      frameworks: ["mocha", "karma-typescript"],

      files: [
          { pattern: "node_modules/expect.js/index.js" },
          { pattern: "src/**/*.ts" }
      ],

      preprocessors: {
          "**/*.ts": ["karma-typescript"]
      },

      reporters: ["dots", "karma-typescript"],
      
      singleRun: true,

      karmaTypescriptConfig: {
        bundlerOptions: {
            transforms: [require("karma-typescript-es6-transform")()]
        }
    },

      browsers: ["PhantomJS"]
  });
};
