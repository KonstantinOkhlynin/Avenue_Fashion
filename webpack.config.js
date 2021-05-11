const path = require('path');
// подключаем path к конфигу вебпак
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const autoprefixer = require('autoprefixer');
module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{ // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules
                },

                {
                    test: /\.css$/, // применять это правило только к CSS-файлам
                    use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    {
                        loader:'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=./vendor/[name].[ext]'
                },

                {
                    test: /\.(png|jpe?g|svg|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: './images/[name].[ext]',
                                esModule: false
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true,
                                disable: true,
                            },
                        },
                    ]
                },
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        //     new OptimizeCssAssetsPlugin({
        //         assetNameRegExp: /\.css$/g,
        //         cssProcessor: require('cssnano'),
        //         cssProcessorPluginOptions: {
        //                 preset: ['default'],
        //         },
        //         canPrint: true
        // }),
            new HtmlWebpackPlugin({ // настроили плагин
                inject: false,
                template: './src/index.html',
                filename: 'index.html'
            }),
            new HtmlWebpackPlugin({ // настроили плагин
                inject: false,
                template: './src/localstores.html',
                filename: 'localstores.html'
            }),
            new HtmlWebpackPlugin({ // настроили плагин
                inject: false,
                template: './src/brand.html',
                filename: 'brand.html'
            }),
            new HtmlWebpackPlugin({ // настроили плагин
                inject: false,
                template: './src/lookbookpage.html',
                filename: 'lookbookpage.html'
            }),
            new HtmlWebpackPlugin({ // настроили плагин
                inject: false,
                template: './src/auth.html',
                filename: 'auth.html'
            }),
            new HtmlWebpackPlugin({ // настроили плагин
              inject: false,
              template: './src/product.html',
              filename: 'product.html'
          }),
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new WebpackMd5Hash()
            ]
};
// переписали точку выхода, используя утилиту path