// ==UserScript==
// @name         Hide NGA Post Ad
// @namespace    SN_HideNGAPostAd
// @version      0.4
// @description  at bbs.nga.cn, hide and jump ads, hide avatar and img except hover.
// @author       SurgeNight
// @match        https://bbs.nga.cn/read.php?tid=**
// @match        https://ngabbs.com/read.php?tid=**
// @match        https://bbs.nga.cn/misc/adpage_insert_2.html**
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    if (location.href.includes("/adpage_insert_2")) {
        getJump();
        return;
    }
    let ele = document.createElement('style');
    ele.innerHTML = "#m_posts_c > span { display: none; }\n";
    ele.innerHTML += "div#b_nav > div { display: none; }\n";
    ele.innerHTML += "div#b_nav > div.nav { display: block; }\n";
    ele.innerHTML += "span#fast_post_c > div > div > table > tbody > tr > td:nth-child(2) { display: none; }\n";
    ele.innerHTML += "img.smile_ac, img.avatar { opacity: 0.05; }\n";
    ele.innerHTML += "img.smile_ac:hover, img.avatar:hover { opacity: 1; }\n";
    document.head.insertBefore(ele, document.head.lastElementChild);
})();
