const path = require("path");
module.exports = {
  transpileDependencies: [],
  publicPath: process.env.NODE_ENV === "development" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 9611
  },
  configureWebpack: {
    context: path.resolve(__dirname, "./"),
    //别名配置
    resolve: {
      extensions: [",js", ".vue"],
      alias: {
        "@": path.resolve("src")
      }
    }
  }
};
