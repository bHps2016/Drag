const path = require('path');

module.exports = {

    watch: true,

    target: 'electron',

    entry: './app/src/entry.js',

    output: {
        path: __dirname + '/app/build',
        publicPath: 'build/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            { 
                test: /\.(html|tpl)$/, 
                loader: 'html-loader' 
            },
            {
                test: /\.(eot|ttf|svg)$/,
                loader : 'file?prefix=font/'
            },
            {
                test: /\.woff/,
                loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?limit=8192',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devtool: '#eval-source-map',
    resolve: {
        extensions: ['.js', '.scss','.vue'],
        alias: {vue: 'vue/dist/vue.js'}
    }
}
