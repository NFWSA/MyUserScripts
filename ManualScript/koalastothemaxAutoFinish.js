javascript:
(function () {
    let body = document.body;
    let svg = document.getElementById("dots").getElementsByTagName("svg")[0];
    let cnt = 0;
    let idx = 0;
    function sp() {
        if (cnt >= 7)
            clearInterval(idx);
        for (let i = (body.clientWidth - svg.clientWidth) / 2 - 10; i <= (body.clientWidth + svg.clientWidth) / 2 + 10; i += 4) {
            for (let j = (body.clientHeight - svg.clientHeight) / 2 - 10; j <= (body.clientHeight + svg.clientHeight) / 2 + 10; j += 512) {
                let a= new MouseEvent("mousemove", {"clientX": i, "clientY": j});
                document.body.dispatchEvent(a);
            }
        }
    }
    idx = setInterval(sp, 1000);
})();
