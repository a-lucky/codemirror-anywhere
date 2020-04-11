const path = require('path');
const webpack = require('webpack');
const version = require("./package.json").version;
const banner = `/*!
// ==UserScript==
// @name        codemirror-anywhere
// @namespace   http://efcl.info/
// @description codemirror-anywhere
// @include     http://*
// @include     https://*
// @version     ${version}
// @grant       none
// ==/UserScript==
*/`;
module.exports = {
    mode: 'development',
    plugins: [
        new webpack.BannerPlugin({
            raw: true,
            entryOnly: true,
            banner: banner
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8192 }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.js',
        ]
    },

    entry: {
        "codemirror-anywhere.user": "./lib/codemirror-anywhere.user.ts"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};
