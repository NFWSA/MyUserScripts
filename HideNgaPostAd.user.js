// ==UserScript==
// @name         Hide NGA Post Ad
// @namespace    SN_HideNGAPostAd
// @version      0.2
// @description  at bbs.nga.cn, hide the ads in post.
// @author       SurgeNight
// @match        https://bbs.nga.cn/read.php?tid=**
// @match        https://ngabbs.com/read.php?tid=**
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    let ele = document.createElement('style');
    ele.innerHTML = "#m_posts_c > span { display: none; }";
    document.head.insertBefore(ele, document.head.lastElementChild);
})();
