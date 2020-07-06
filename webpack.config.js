const path                    = require('path');
const htmlWebpackPlugin       = require('html-webpack-plugin');
const miniCssExtractPlugin    = require("mini-css-extract-plugin");
const iconfontWebpackPlugin   = require('iconfont-webpack-plugin');

const mode                    = process.env.WEBPACK_MODE;

const config                  = {};

config.entry = {
    theme: './src'
};

config.output = {
    path: mode == 'development' ? path.resolve(__dirname, './build') : path.resolve(__dirname, './dist'),
    filename: '[name].js'
};

config.devServer = {
    contentBase: path.resolve(__dirname, "./public"),
    open: true,
    historyApiFallback: true
};

config.plugins = [
    new miniCssExtractPlugin({
        filename: "./[name].css"
    }),
    new htmlWebpackPlugin({
        title: 'home',
        filename: 'index.html',
        template: './public/index.html',
        inject: true
    })
];

config.resolve = {
    extensions: ['.js', '.styl', '.json'],
    alias: {
        Core: path.resolve(__dirname, './src/core')
    }
};

config.module = {
    rules: [
        {
            test: /\.js?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                presets: ['env']
            }
        },
        {
            test: /\.styl$/,
            use: [
                miniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: (loader) => [
                            new iconfontWebpackPlugin(loader),
                            require('autoprefixer')({
                                browsers: ['last 2 versions'],
                                grid: true
                            }),
                            mode == 'development' ? false : require('cssnano')({
                                zindex: false
                            })
                        ]
                    }
                },
                {
                    loader: 'stylus-loader',
                    options: {
                        import: path.resolve(__dirname, './src/core/variants/index.styl')
                    }

                }
            ]
        }
    ]
}

module.exports = config;