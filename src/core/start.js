
function start() {
	if (this.mask & 1) {
		var me = this;
		this.mask=6;
		loop();
	}
	function loop() {
		var time = new Date().getTime();
		for (var i = 0; i < me.length; i++) {
			me.levelList[i].next(time);
		}
		me.timer = setTimeout(loop, 15);
	}
}
export default start;