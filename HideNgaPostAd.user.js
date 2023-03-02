// ==UserScript==
// @name         Hide NGA Post Ad
// @namespace    SN_HideNGAPostAd
// @version      0.4.3
// @description  at bbs.nga.cn, hide and jump ads, hide avatar and img except hover.
// @author       SurgeNight
// @match        *://bbs.nga.cn/thread.php?fid=**
// @match        *://ngabbs.com/thread.php?fid=**
// @match        *://nga.178.com/thread.php?fid=**
// @match        *://bbs.nga.cn/read.php?tid=**
// @match        *://ngabbs.com/read.php?tid=**
// @match        *://nga.178.com/read.php?tid=**
// @match        *://bbs.nga.cn/misc/adpage_insert_2.html**
// @match        *://ngabbs.com/misc/adpage_insert_2.html**
// @match        *://nga.178.com/misc/adpage_insert_2.html**
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    if (location.href.includes("/adpage_insert_2")) {
        getJump();
        return;
    }
    else if (location.href.includes("thread.php")) {
        let ele = document.createElement('style');
        ele.innerHTML += "div#m_threads > div > span:nth-child(2) { display: none; }\n";
        ele.innerHTML += "#b_nav > div:nth-child(3) { display: none; }\n";
        ele.innerHTML += "#fast_post_c > div > div > table > tbody > tr > td:nth-child(2) { display: none; }\n";
        document.head.insertBefore(ele, document.head.lastElementChild);
        return;
    }
    let ele = document.createElement('style');
    ele.innerHTML = "#m_posts_c > span { display: none; }\n";
    ele.innerHTML += "div#b_nav > div { display: none; }\n";
    ele.innerHTML += "div#b_nav > div.nav { display: block; }\n";
    ele.innerHTML += "span#fast_post_c > div > div > table > tbody > tr > td:nth-child(2) { display: none; }\n";
    ele.innerHTML += "img.smile_ac, img.avatar, div.sign > img { opacity: 0.05; }\n";
    ele.innerHTML += "img.smile_ac:hover, img.avatar:hover, div.sign > img:hover { opacity: 1; }\n";
    ele.innerHTML += "#post1strow0 > td.null { display: none; }\n";
    document.head.insertBefore(ele, document.head.lastElementChild);
})();
