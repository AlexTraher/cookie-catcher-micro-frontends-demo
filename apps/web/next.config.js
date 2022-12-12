const withTM = require("next-transpile-modules")(["ui", "@my-org/mfe-loader", "@my-org/notifications", "@my-org/cookie-catcher"])


module.exports = withTM({
  reactStrictMode: true,
  webpack: (config) => ({
    ...config,
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ],
    }
  }),
});
