const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    webpack: {
        entry: {
            application: path.join(__dirname, '../src/application.js')
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/',
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules(?!\/clout-tech-web)/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "env",
                                { targets: { browsers: ["IE >= 11", "Chrome >= 61", "Firefox >= 52"], useBuiltIns: true } }
                            ],
                            "react"
                        ],
                        plugins: [[ "transform-object-rest-spread", {  useBuiltIns: true } ]]
                    }
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        }, 'sass-loader']
                    })
                },
                {
                    test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
                    loader: 'file-loader?name=./fonts/[name].[ext]'
                },
                {
                    test: /\.(svg|jpg|JPG)$/i,
                    loader: 'url-loader?name=./assets/[name].[ext]'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body'
            }),
            function() {
                this.plugin("done", function (stats) {
                    if (stats.compilation.errors && stats.compilation.errors.length) {
                        console.error(stats.compilation.errors);
                    }
                });
            }
        ],
        devtool: 'inline-source-map',
        devServer: {
            inline: true,
            progress: true
        },
        watch: true
    }
};
