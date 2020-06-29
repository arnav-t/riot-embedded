var path = require('path');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    'targets': {
                                        'node': 'current'
                                    }
                                }
                            ],
                            '@babel/react',
                            {
                                'plugins': ['@babel/plugin-proposal-class-properties']
                            }
                        ]
                    }
                }
            },
            {
                test:/\.s[ac]ss$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test:/\.svg$/,
                use:['@svgr/webpack']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    watch: false,
    devServer: {
        contentBase: path.resolve(__dirname, '.'),
        port: 9000,
        hot: true,
        writeToDisk: true
    },
};
