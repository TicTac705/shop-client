const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "inline-source-map",
  },
  devServer: {
    proxy: "http://shop.local",
  },
});
