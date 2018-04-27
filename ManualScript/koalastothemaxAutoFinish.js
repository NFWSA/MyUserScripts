var body = document.body;
var svg = document.getElementById("dots").getElementsByTagName("svg")[0];
var cnt = 0;
var idx = 0;
function sp() {
	if (cnt >= 7)
		clearInterval(idx);
	for (var i = (body.clientWidth - svg.clientWidth) / 2 - 10; i <= (body.clientWidth + svg.clientWidth) / 2 + 10; i += 4) {
		for (var j = (body.clientHeight - svg.clientHeight) / 2 - 10; j <= (body.clientHeight + svg.clientHeight) / 2 + 10; j += 512) {
			var a= new MouseEvent("mousemove", {"clientX": i, "clientY": j});
			document.body.dispatchEvent(a);
		}
	}
}
idx = setInterval(sp, 1000);
