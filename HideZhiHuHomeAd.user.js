// ==UserScript==
// @name         Hide ZhiHu Homepage Ad
// @namespace    SN_HideZhiHuHomeAd
// @version      0.11.1
// @description  at zhihu.com's homepage, hide the ads in right sidebar and list container.
// @author       SurgeNight
// @match        http*://www.zhihu.com
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function() {
    let ele = document.createElement('style');
    ele.innerHTML = ".Card.Banner { display: none; }\n.TopstoryItem--advertCard { display: none; }";
    document.head.insertBefore(ele, document.head.lastElementChild);
})();
