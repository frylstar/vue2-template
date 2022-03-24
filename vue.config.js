// 使用 @vue/cli-service 提供的 defineConfig 帮手函数，以获得更好的类型提示
const { defineConfig } = require("@vue/cli-service")
const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const resolve = dir => path.join(__dirname, dir)

module.exports = defineConfig({
  // 既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本
  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    }

    if (!IS_PROD) {
      /**
       * 如果使用 uglifyjs-webpack-plugin 会报错，可能存在 node_modules 中有些依赖需要 babel 转译。
       * 而 vue-cli 的transpileDependencies配置默认为[], babel-loader 会忽略所有 node_modules 中的文件。
       * 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。配置需要转译的第三方库。
       */
      // 去除console.log
      plugins.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ["console.log"],
            },
          },
          // sourceMap: false,
          parallel: true,
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  /**
   * 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。
   * 你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
   * 不过，对所有的依赖都进行转译可能会降低构建速度。
   * 如果对构建性能有所顾虑，你可以只转译部分特定的依赖：
   * 给本选项传一个数组，列出需要转译的第三方包包名或正则表达式即可。
   */
  transpileDependencies: true,

  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"))
      .set("@static", resolve("src/static"))

    // 添加打包分析
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ])
    }
  },
  // 配置 proxy 代理解决跨域问题
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target: "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
})
