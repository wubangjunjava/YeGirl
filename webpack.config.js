const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    entry: {
        index: [
            './js/index.js'
            ,'./js/media.js'
            ,'./js/heart.js'
            ,'./js/import-css.js'
            ,'./js/jquery.imgbox.js'
        ]
    }
    ,output: {
        //[hash]等效HtmlWebpackPlugin.hash
        filename: 'js/[name].min.js'
        ,path: path.resolve(__dirname, 'dist')
    }
    ,devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9090
    }
    ,plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, './') //root dir [./]
            ,verbose: true //console.log
            ,dry: false //delete files
        })
        ,new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './images')
                ,to: './images'
            }
            // ,{
            //     from: path.resolve(__dirname, './css')
            //     ,to: './css'
            // }
            ,{
                from: path.resolve(__dirname, './js')
                ,to: './js'
                ,ignore: ['!*.min.js']
            }
        ])
        ,new HtmlWebpackPlugin({
            filename: 'index.html'
            ,template: 'index.html'
            ,inject: true
            ,hash: true
            ,chunks: ['index']
            ,minify: {
                removeAttributeQuotes: true //移除属性引号
                ,collapseWhitespace: true   //压缩空间
                ,keepClosingSlash: false //不保留尾部斜杠
            }
        })
        ,new UglifyjsWebpackPlugin({
            test: /\.js($|\?)/i
            ,exclude: /\/node_modules/
        })
        // ,new OptimizeCSSPlugin({
        //     cssProcessorOptions: {
        //         discardComments: {
        //             removeAll: true
        //         }
        //     }
        // })
        ,new MiniCssExtractPlugin({
            filename: 'css/[name].css'
            // ,chunkFilename: '[id].css'
        })
    ]
    ,optimization: {
        minimizer: [new OptimizeCSSPlugin()]
    }
    ,module: {
        rules: [
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, /*'style-loader',*/ 'css-loader']
            }
            ,{
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                //outputPath=./ => 当前路径（[path]保持原层级）
                //publicPath=./ => 发布路径
                use: 'url-loader?limit=10240&name=[path][name].[ext]?[hash]&outputPath=./&publicPath=./'
            }
            //---------------------------------//
            // {
            //     test: /\.css$/i
            //     ,use: [
            //         {
            //             loader: ['style-loader', 'css-loader']
            //             ,options: {
            //                 minimize: true
            //             }
            //         }
            //     ]
            // }
            // ,{
            //     test: /\.(jpg|jpeg|png|gif)$/i
            //     ,use: [
            //         {
            //             loader: ['url-loader']
            //             ,options: {
            //                 limit: '1024'
            //             }
            //         }
            //     ]
            // }
        ]
    }
}

module.exports = config;