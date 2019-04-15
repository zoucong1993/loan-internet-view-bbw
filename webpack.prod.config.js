const resolve = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 抽取css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 合并模块
const merge = require("webpack-merge");

// js压缩、优化插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
// 将vendor生成的文件放在index.html文件中
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const libs = require("./src/lib.config");



const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        path: resolve(__dirname, "./dist"),
        filename: "[name].js?[chunkhash]",
        chunkFilename: "[name].js?[chunkhash]"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                    priority: 10
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                // 压缩js
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: false,
                        drop_console: true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                // 压缩css
                cssProcessorOptions: {
                    safe: true
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css"
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, "./static"),
                to: "static",
                ignore: [".*"]
            }
        ]),
        new AddAssetHtmlPlugin(libs)
    ]
});

module.exports = webpackConfig;
