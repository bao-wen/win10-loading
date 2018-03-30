var emptyArr = [];
var slice = emptyArr.slice;
var delayTime = 100;
var bigRadius = 80;
var smallRadius = 3;
var ele1UniformDeg = 20;
var ele1UniformTime = 300;
var ele1Value2 = 180 - ele1UniformDeg;
var boxR = boxW / 2;
var ballRangle = Math.asin(minR / (boxR - minR)) * 2 * 90;
var mutable = {};


var uniformSpeed = ele1UniformDeg / ele1UniformTime;
export {mutable, emptyArr, ballRangle, uniformSpeed, boxW, boxH, minR, slice};
