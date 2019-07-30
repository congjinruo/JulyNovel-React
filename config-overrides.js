const { override, fixBabelImports, addLessLoader } = require('customize-cra');

  module.exports = {
    webpack: override(
      fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: 'es',
        style: true
      }),
      addLessLoader({
        javascriptEnabled: true,
        modifyVars: {"@primary-color": "#3db389"}
      })
    )
  };

