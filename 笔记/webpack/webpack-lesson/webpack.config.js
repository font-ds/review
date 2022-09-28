const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            //打包图片
            {
                test: /\.(jpg|png|gif)$/,
                // use: {
                //     loader: 'file-loader',
                //     options: {
                //         name: '[name]_[hash].[ext]',
                //         outputPath: 'images/'
                //     }
                // }
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/'
                    }
                }
            },

            //打包css文件
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true
                        }
                    },
                    'postcss-loader'
                ]
            },

            //打包icon的字体文件
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader',

                }
            },

            //打包es6代码
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {
                            useBuiltIns: "usage"
                        }],
                            "@babel/preset-react"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        hot: true,
        hotOnly: true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        spiltChunks: {
            chunks: 'all'
        },
        usedExports: true
    },
    mode: 'development',
    devtool: 'source-map'
}