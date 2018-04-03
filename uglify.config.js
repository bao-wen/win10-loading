var UglifyJS = require('uglify-js');
var fs = require('fs');

let code = fs.readFileSync('./dist/win10-loading.js', 'utf-8');
var result = UglifyJS.minify(code).code;
fs.writeFileSync('./dist/win10-loading.min.js', result, {
	encoding: 'utf8',
	flag: 'w'
});
