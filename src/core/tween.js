function linear(b, c, d, t) {
	return c * t / d + b;
}

function quadEaseIn(b, c, d, t) {
	return c * (t /= d) * t + b;
}

function quadEaseOut(b, c, d, t) {
	return -c * (t /= d) * (t - 2) + b;
}

function quadEaseInOut(Quadb, c, d, t) {
	if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	return -c / 2 * ((--t) * (t - 2) - 1) + b;
}


function cubicEaseIn(b, c, d, t) {
	return c * (t /= d) * t * t + b;
}

function cubicEaseOut(b, c, d, t) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}

function cubicEaseInOut(b, c, d, t) {
	if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	return c / 2 * ((t -= 2) * t * t + 2) + b;
}


function quartEaseIn(b, c, d, t) {
	return c * (t /= d) * t * t * t + b;
}

function quartEaseOut(b, c, d, t) {
	return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function quartEaseInOut(b, c, d, t) {
	if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}


function quintEaseIn(b, c, d, t) {
	return c * (t /= d) * t * t * t * t + b;
}

function quintEaseOut(b, c, d, t) {
	return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function quintEaseInOut(b, c, d, t) {
	if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}


function sineEaseIn(b, c, d, t) {
	return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

function sineEaseOut(b, c, d, t) {
	return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

function sineEaseInOut(b, c, d, t) {
	return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

function expoEaseIn(b, c, d, t) {
	return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}


function expoEaseOut(b, c, d, t) {
	return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}


function expoEaseInOut(b, c, d, t) {
	if (t == 0) return b;
	if (t == d) return b + c;
	if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}


function circEaseIn(b, c, d, t) {
	return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}


function circEaseOut(b, c, d, t) {
	return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}


function circEaseInOut(b, c, d, t) {
	if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}


export {
	linear, quadEaseIn, quadEaseOut, quadEaseInOut, cubicEaseIn, cubicEaseOut,
	cubicEaseInOut, quartEaseIn, quartEaseOut, quartEaseInOut, quintEaseIn,
	quintEaseInOut, quintEaseOut, sineEaseIn, sineEaseOut, sineEaseInOut, expoEaseIn
	, expoEaseOut, expoEaseInOut, circEaseIn, circEaseOut, circEaseInOut
};
