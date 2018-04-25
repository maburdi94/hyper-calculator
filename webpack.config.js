
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';


const config = {
    context: __dirname,
    mode: process.env.NODE_ENV,
    entry: './index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            }
        ]
    },
    devServer: {
        contentBase: './dist'
   },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Calculator",
            template: './index.html'
        })
    ]
};

export default config;