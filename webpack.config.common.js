const { join } = require('path')
const path = require('path')
 
const webpack = require('webpack'); //to access built-in plugins
const CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const rootfolder = __dirname;
const distfolder = join(rootfolder, 'wwwroot/dist/');
const scriptsfolder = join(rootfolder, 'src/scripts/');
const nodeModulesFolder = path.resolve(rootfolder + "/node_modules/");

 
module.exports = {

    entry: {         
        'bundle.js': join(scriptsfolder, 'index')
    },
    output: {
        path: distfolder,  
        publicPath: "/wwwroot/dist/"
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.less', '.scss', '.saas'],
        alias: { // shortcuts
            'nm': path.join(rootfolder, 'node_modules'),
            'jquery': require.resolve('jquery'),  
            popper: join(nodeModulesFolder, "/popper.js/dist/esm/popper.js"),
            modernizr$: join(rootfolder, ".modernizrrc.js") 
        }
    },

    plugins: [
           new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"          
        }),
        new CleanWebpackPlugin(distfolder) 
    ],
    module: {
        rules: [{
            loader: "webpack-modernizr-loader",
            test: /\.modernizrrc\.js$/
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }, {
            test: /\.less$/i,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }, { 
            test: /\.(scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader', 
                }, {
                    loader: 'postcss-loader', 
                    options: {
                        plugins: function () { 
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }],
            })
        }, {
            test: /\.ts$/,
            loader: 'ts-loader'
        },

        { // SO
            test: /\.(png|ico|svg|jpg|gif)$/,
            exclude: /node_modules/,
            use: {
                loader: 'file-loader',
                options: {
                    name: function (fullPath) { // mirrors the src folder structure to output folder for images
                        console.log("Executing png|ico|svg|jpg|gif - rule for : " + fullPath);
                        console.log("Relative image path: " + path.relative(rootfolder + '/src', fullPath));
                        return path.relative(rootfolder + '/src', fullPath); //.replace(/\\/g, '\/'); // regex to replace slashes, otherwise it bugs with img's in css : --> background: url(../images/blue.jpg); will be /images\blue.jpg
                    },
                    //name: '[name].[ext]',
                    //useRelativePath: true,
                    //outputPath: function (imageNameWithExtension) {
                    //    return imageNameWithExtension;
                    //}
                }
            }
        } 
        ]
    }
}