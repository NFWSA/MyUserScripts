// ==UserScript==
// @name         Hide GuanCha Sidebar and Ad
// @namespace    SN_HideGuanChaAd
// @version      0.1.1
// @description  hide the guancha.cn's right sidebar and bottom and center ad bar.
// @author       SurgeNight
// @match        http://www.guancha.cn/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function () {
    let icnt = 0;
    let jcnt = 0;

    function hideBottom() {
        ++icnt;
        if (icnt >= 50)
            return;
        let ele = $('div#pager+div')[0];
        if (ele != null) {
            ele.hidden = true;
        }
        else {
            setTimeout(hideBottom, 1000);
            console.log('hide bottom ad fail!', a);
        }
    }

    function hideCenterAd() {
        ++jcnt;
        if (jcnt >= 50)
            return;
        let ele = $('ul.article-other+div')[0];
        if (ele != null) {
            ele.hidden = true;
        }
        else {
            setTimeout(hideCenterAd, 1000);
            console.log('hide center ad fail!', a);
        }
    }

    let ele = document.getElementsByClassName("right")[0];
    if (ele !== null)
        ele.hidden = true;
    else
        console.log('hide right sidebar fail!');
    hideBottom();
    hideCenterAd();
})();
