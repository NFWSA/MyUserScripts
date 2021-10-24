// ==UserScript==
// @name         Auto BaiduYun Password
// @namespace    AutoPanBD
// @version      0.1
// @description  auto input password with arg pwd at pan.baidu.com
// @author       SurgeNight
// @match        http*://pan.baidu.com/s*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
	//param = document.location.search.substr(1);
	param = window.name;
	if (param.match('AutoPwdPan=') !== null) {
		param = param.substr(11);
		let cid = setInterval(function(){
			console.log('auto password is :' + param);
			let ins = document.querySelector("#accessCode");
			let btn = document.querySelector("#submitBtn");
			if (ins && btn) {
				ins.value = param;
				btn.click();
				clearInterval(cid);
			}
		}, 200);
	}
})();
