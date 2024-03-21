const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '../src/main.tsx'),
    devServer: {
        port: 8082,
        watchFiles: "../../../../target/classes/static/frontend"
    },
    output: {
        path: path.join(__dirname, "../../../../target/classes/static/frontend"),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node-modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node-modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '../public/index.html')}
        )
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"]
    },
    watch: false,
    stats: {
        colors: true
    }
};