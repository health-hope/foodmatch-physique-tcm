const vuxLoader = require('vux-loader');
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    configureWebpack: config => {
        vuxLoader.merge(config, {
            options: {},
            plugins: ['vux-ui']
        })
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('@assets', resolve('src/assets'))
    },
    devServer: {
        port: 8081
    },
    css: undefined,
    lintOnSave: false,
    assetsDir: undefined,
    publicPath: './',
    runtimeCompiler: true, // 包含运行时编译器的 Vue 构建版本
    productionSourceMap: false,
    parallel: undefined,
    outputDir: 'foodmatch-physique-tcm',
}
