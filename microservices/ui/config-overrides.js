const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@bundles": path.resolve(__dirname, "src/bundles"),
      "@root": path.resolve(__dirname, "src"),
    },
  };
  return config;
};
