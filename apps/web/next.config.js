const withTM = require("next-transpile-modules")(["ui", "@my-org/mfe-loader", "@my-org/notifications"])

module.exports = withTM({
  reactStrictMode: true,
  
});
