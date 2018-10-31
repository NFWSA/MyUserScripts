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
		console.log('auto password is :' + param);
		var ins = document.getElementsByTagName('input');
		for (var i = 0; i < ins.length; ++i) {
			if (ins[i].tabIndex == 1) {
				ins = ins[i];
				break;
			}
		}
		ins.value = param;
		ins.parentElement.getElementsByTagName('a')[0].click();
	}
	else {
		console.log('auto password error!');
	}
})();
