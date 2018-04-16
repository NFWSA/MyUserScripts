// ==UserScript==
// @name         Hide ZhiHu Sidebar
// @namespace    SN_HideZhiHuAd
// @version      0.11
// @description  hide the zhihu.com's right sidebar.
// @author       SurgeNight
// @match        http*://www.zhihu.com/question/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
	document.getElementsByClassName("Sticky is-fixed")[3].hidden = true;
	setInterval(() => {
		document.getElementsByClassName("Sticky is-fixed")[0].className = "Sticky AppHeader is-fixed";
		document.getElementsByClassName("Sticky is-fixed")[0].getElementsByClassName("PageHeader")[0].className = "PageHeader";
	}, 200);
})();


