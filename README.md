# win10-loading
windows 10 loading animation

[demo](https://bao-wen.github.io/win10-loading/)

#### browser-support

##### Desktop

- Chrome: (Current - 1) and Current
- Edge: (Current - 1) and Current
- Firefox: (Current - 1) and Current
- Internet Explorer: 9+
- Safari: (Current - 1) and Current
- Opera: Current

##### Mobile

- Stock browser on Android 4.0+
- Safari on iOS 7+

#### Installation

Using npm:

	npm i --save win10-loading
&nbsp;


	import win10Loading from 'win10-loading';
Or manually download and link anime.min.js in your HTML:

	<script src="win10-loading.min.js"></script>
#### Basic Usage

	//init
	var wL=win10Loading();
	//start
	wl.start();
	//pause
	wl.pause();
	//stop
	wl.stop()

#### Options

	var wl=win10Loading({
		// rotary diameter,default 100
	    width: Number,
	    // small ball diameter,default 3
		ballWidth: Number,
		// ball color,default #000,can pass an array of color string. e.g. ['#333','red']
		color: String|Sting[],
		// container parent element,default body. center alignment.
		// default fixed positon ,other elements are absolute position
		relative: node
	})
