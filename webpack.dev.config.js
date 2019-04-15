const resolve = require("path").resolve;
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const merge = require("webpack-merge");
const HappyPack = require("happypack"); //多线程运行
var happyThreadPool = HappyPack.ThreadPool({ size: 4 });

// const basePath = "http://192.168.193.237:8081";
// const basePath = "http://192.168.192.69:8081";
const basePath = "http://localhost:8085";

const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const libs = require("./src/lib.config");

const webpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    output: {
        path: resolve(__dirname, "./dist"),
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),

        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        // new CopyWebpackPlugin([
        //     { from: "./dll/vendor.dll.js", to: resolve(__dirname, "dist") }
        // ]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./src/dll/vendor-manifest.json")
        }),
        new HappyPack({
            //多线程运行 默认是电脑核数-1
            id: "babel", //对于loaders id
            loaders: ["cache-loader", "babel-loader?cacheDirectory"], //是用babel-loader解析
            threadPool: happyThreadPool,
            verboseWhenProfiling: true //显示信息
        }),
       
        new AddAssetHtmlPlugin({ filepath: require.resolve('./src/dll/vendor.dll.js'), includeSourcemap: false })
    ],
   
    devServer: {
        host: "127.0.0.1",
        port: 8010,
        open: true,
        proxy: {
            "/loan": {
                target: basePath,
                changeOrigin: true,
                pathRewrite: {
                    "^/loan": ""
                }
            },
            "/rule": {
                target: basePath, //url和上面的路径一样
                changeOrigin: true,
                pathRewrite: {
                    "^/rule": ""
                }
            },
            "/flow": {
                target: basePath,
                changeOrigin: true,
                pathRewrite: {
                    "^/flow": "/flow"
                }
            }
        }
    }
});

module.exports = webpackConfig;
