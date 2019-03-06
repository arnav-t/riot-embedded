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
				test:/\.css$/,
				use:['style-loader','css-loader']
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, '.'),
		port: 9000
	},
};