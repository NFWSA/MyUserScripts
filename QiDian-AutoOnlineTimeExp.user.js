// ==UserScript==
// @name         QiDian Auto Online Time Exp Award Gain
// @namespace    QiDianAutoOnlineTimeExp
// @version      0.1.0
// @description  auto click button to get online time experience on qidian.com.
// @author       SurgeNight
// @match        http*://my.qidian.com/level*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
	let intId = setInterval(() =>
		{
			let ele = document.getElementById("elTaskWrap");
			if (ele == null)
				return;
			ele = ele.getElementsByClassName("ui-button");
			ele = ele.length > 0 ? ele[0] : null;
			if ((ele && !ele.innerText.includes(":"))) {
				ele.click();
				if (intId)
					clearInterval(intId);
			}
		},
	5000);
})();
