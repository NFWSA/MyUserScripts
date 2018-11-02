// ==UserScript==
// @name         Hide ZhiHu Homepage Ad
// @namespace    SN_HideZhiHuHomeAd
// @version      0.11
// @description  at zhihu.com's homepage, hide the ads in right sidebar and list container.
// @author       SurgeNight
// @match        http*://www.zhihu.com
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
	for (var x of document.getElementsByClassName("Card Banner"))
		x.remove();
	for (var x of document.getElementsByClassName("TopstoryItem--advertCard"))
		x.remove();
})();
