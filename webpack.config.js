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
				test:/\.jsx?/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.jsx', '.js']
	},
	watch: true,
	devServer: {
		contentBase: path.resolve(__dirname, '.'),
		port: 9000,
		hot: true,
		inline: true
	},
};