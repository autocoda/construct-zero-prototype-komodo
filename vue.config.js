const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.entry('main')
      .add('./src/scss/main.scss')
      .end();
  },

  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: 'css/[name].css'
    },
    sourceMap: true
  },
})
