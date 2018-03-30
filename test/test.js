// var should = chai.should();
// var assert = chai.assert;
// describe('simple test', function () {
//     it('should equal 0 when n === 0', function () {
//         window.fibonacci(0).should.equal(0);
//     });
//     it('id selector test', function () {
//         assert.lengthOf(document.getElementsByClassName('cltest'),7);
//     });
// });

// console.log('testss');
// import './test.css';

import win10Loading from '../src';

var wl = win10Loading();
// wl.start();
var start = document.querySelector('.start-button');
var pause = document.querySelector('.pause-button');
var stop = document.querySelector('.stop-button');
start.onclick = function () {
	
	wl.start();
};
pause.onclick = function () {
	
	wl.pause();
};

stop.onclick = function () {
	
	wl.stop();
};