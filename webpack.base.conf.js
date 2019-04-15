"use strict";
const { resolve} = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: {
        // vendor: resolve(__dirname, "./src/vendor"),
        index: resolve(__dirname, "./src/main.js")
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                include: /src/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015", "stage-3"]
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            "~": resolve(__dirname, "src"),
            //"&": resolve(__dirname, "./src"), //公共业务页面
            // "#": resolve(__dirname, "../loan-crdt-view/src"), //信贷独立业务页面
            //"#" : resolve(__dirname,'./src/tempViews')
        }
    },

    plugins: [new VueLoaderPlugin()]
};
