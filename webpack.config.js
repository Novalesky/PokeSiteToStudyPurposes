const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports ={
    mode:'development',
    entry:"./index.js",
    output:{
        filename:"main.js",
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
    //         {
    //         test:"/\.html$/i",
    //         loader:"html-loader"
    // },
    {
        test: /\.(sa|sc|c)ss$/,
        use:[MiniCssExtractPlugin.loader, "css-loader"]
    }
]
    },
    plugins:[new HtmlWebpackPlugin({template:'./index.html'}),
        new MiniCssExtractPlugin({filename:'./index.css'})]
}