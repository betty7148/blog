const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const open = require('opn');

const host='127.0.0.1';
const eggPort = '7001';
let openBrowser = true;
class OnBuildDonePlugin{
    apply(complier){
        complier.hooks.done.tap('OneBuildDonePlugin',()=>{
            if(openBrowser){
                setTimeout(()=>{
                    openBrowser = false;
                    open(`http://${host}:${eggPort}`, {
                        app : 'Google Chrome'
                    }).catch(err => {
                        console.log('open browser error:');
                        console.log(err);
                    });
                },1)
            }
        })
    }
}

module.exports = {
    entry: {
        app:path.resolve(__dirname, "./web/app.js"),
        // backapp:path.resolve(__dirname, "./web/backapp.js"),
    },
    output: {
        path: path.resolve("./public"),
        filename: 'js/[name].bundle[hash].js',
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(img|png|jpeg|gif|jpg)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./web/index.html'),
            filename: 'index.html',
            // inject:true,
            // chunks:['app']
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname,'./web/backIndex.html'),
        //     filename: 'backIndex.html',
        //     inject:true,
        //     chunks:['backapp']
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new OnBuildDonePlugin()
    ],
    devServer:{
        // open: true,//自动打开dev-server
        host: '127.0.0.1',
        port: 3000,
        hot: true,
        publicPath: '/public/',
        contentBase: './',
        progress: true
    }
}