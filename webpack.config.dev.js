const {
    join
} = require('path')

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(common, {  
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js', 
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new HTMLWebpackPlugin({
            title: 'Bundle-Test' 
        })
    ] 
});