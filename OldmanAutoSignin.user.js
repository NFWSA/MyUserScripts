// ==UserScript==
// @name         oldmanemu auto sign
// @namespace    OldManEmuAutoSign
// @version      0.1
// @description  auto click sign button to get score on bbs.oldmanemu.net.
// @author       SurgeNight
// @match        https://bbs.oldmanemu.net/index-*.htm
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    function DateStamp() {
        let date = new Date();
        return date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    }
    let signdate = localStorage.AutoSignDateStamp;
    setInterval(() => {
        if (signdate != null && signdate == DateStamp())
            return;
        if (localStorage.SignNeedRefresh == "need") {
            delete localStorage.SignNeedRefresh;
            location.reload(true);
            return;
        }
        let btn = document.getElementById("tt_sign");
        if (btn == null)
            return;
        localStorage.AutoSignDateStamp = DateStamp();
        signdate = localStorage.AutoSignDateStamp;
        localStorage.SignNeedRefresh = "need";
        btn.click();
        let clsId = setInterval(() => {
            let cls = document.querySelector("div.modal-footer > button.btn");
            if (cls == null)
                return;
            cls.click();
            clearInterval(clsId);
        }, 1000);
    }, 2000);
})();
