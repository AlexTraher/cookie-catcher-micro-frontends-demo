const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "my-org",
    projectName: "cookie-catcher",
    webpackConfigEnv,
    argv,
  });


  defaultConfig.externals = defaultConfig.externals.filter((ext) => !['react', 'react-dom'].includes(ext));
  
  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
