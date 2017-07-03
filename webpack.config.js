const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.resolve(__dirname, 'src'),
    //エントリーポイントの設定
    entry: './app.js',
    output: {
        //出力先のパス
        path: path.resolve(__dirname, 'dist'),
        //出力するファイル名
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};

module.exports = config;