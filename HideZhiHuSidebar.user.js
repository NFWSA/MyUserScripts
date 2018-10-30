// ==UserScript==
// @name         Hide ZhiHu Sidebar
// @namespace    SN_HideZhiHuAd
// @version      0.12
// @description  hide the zhihu.com's right sidebar.
// @author       SurgeNight
// @match        http*://www.zhihu.com/question/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
	var list = document.getElementsByClassName("Sticky");
    list[list.length - 1].hidden = true;
	setInterval(() => {
		document.getElementsByClassName("Sticky AppHeader")[0].className = "Sticky AppHeader is-fixed";
		document.getElementsByClassName("Sticky AppHeader")[0].getElementsByClassName("PageHeader")[0].className = "PageHeader";
	}, 200);
})();
