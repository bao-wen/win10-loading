var UglifyJS = require('uglify-js');
var fs = require('fs');

let code = fs.readFileSync('./dist/win10_loading.js', 'utf-8');
var result = UglifyJS.minify(code).code;
fs.writeFileSync('./dist/win10_loading.min.js', result, {
	encoding: 'utf8',
	flag: 'w'
});
