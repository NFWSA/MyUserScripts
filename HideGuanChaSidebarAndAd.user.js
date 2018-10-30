// ==UserScript==
// @name         Hide GuanCha Sidebar and Ad
// @namespace    SN_HideGuanChaAd
// @version      0.1
// @description  hide the guancha.cn's right sidebar and bottom and center ad bar.
// @author       SurgeNight
// @match        http://www.guancha.cn/*
// @grant        none
// @run-at document-idle
// ==/UserScript==
icnt = 0;
jcnt = 0;

function hideBottom()
{
    ++icnt;
    if(icnt  >= 50)
        return;
    a = $('div#pager+div')[0];
    if(a) {
        a.hidden = true;
    }
    else {
        setTimeout(hideBottom, 1000);
        console.log('hide bottom ad fail!', a);
    }
}

function hideCenterAd()
{
    ++jcnt;
    if(jcnt  >= 50)
        return;
    a = $('ul.article-other+div')[0];
    if(a) {
        a.hidden = true;
    }
    else {
        setTimeout(hideCenterAd, 1000);
        console.log('hide center ad fail!', a);
    }
}

(function() {
    var a = document.getElementsByClassName("right")[0];
    if(a !== null)
        a.hidden = true;
    else
        console.log('hide right sidebar fail!');
    hideBottom();
    hideCenterAd();
})();
