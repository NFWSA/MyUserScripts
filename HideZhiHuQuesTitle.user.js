// ==UserScript==
// @name         Hide ZhiHu Question Title And Ad
// @namespace    SN_HideZhiHuQuesTitle
// @version      0.13.1
// @description  hide the right sidebar that contain ads and the title bar of zhihu.com's question page.
// @author       SurgeNight
// @match        http*://www.zhihu.com/question/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
    let list = document.getElementsByClassName("Sticky");
    list[list.length - 1].hidden = true;
    setInterval(() => {
        document.getElementsByClassName("Sticky AppHeader")[0].className = "Sticky AppHeader is-fixed";
        document.getElementsByClassName("Sticky AppHeader")[0].getElementsByClassName("PageHeader")[0].className = "PageHeader";
    }, 200);
})();
