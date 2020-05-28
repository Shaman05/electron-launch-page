/**
 * Created by ChenChao on 2020/4/21.
 *
 */

const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.join(__dirname, 'dist'),
		libraryTarget: 'commonjs2',
		library: 'Elp'
	},
	externals: {
		electron: 'electron'
	},
	module: {}
};
