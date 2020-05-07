const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
    entry: {
        'app': [
            'react-hot-loader/patch',
            './src/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {

        extensions: [
            '.js',
            '.jsx'
        ],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new FaviconsWebpackPlugin('favicon.png'),
        new Dotenv(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            appMountId: 'container',
            filename: 'index.html'
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

module.exports = (env, argv) => {
    if (argv.hot) {
        // Cannot use 'contenthash' when hot reloading is enabled.
        config.output.filename = '[name].[hash].js';
    }

    return config;
};