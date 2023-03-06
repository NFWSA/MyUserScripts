// ==UserScript==
// @name         QiDian Auto Online Time Exp Award Gain
// @namespace    QiDianAutoOnlineTimeExp
// @version      0.1.2
// @description  auto click button to get online time experience on qidian.com.
// @author       SurgeNight
// @match        http*://my.qidian.com/level*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    function DateStamp() {
        let date = new Date();
        return date.getFullYear() * 370 + (date.getMonth() + 1) * 31 + date.getDate();
    }
    let now = DateStamp();
    let interval_id = -1;
    let AutoClickOrWait = () => {
        if (now != DateStamp())
            return location.reload(true);
        let table = document.querySelector("ul#elTaskWrap");
        if (table == null)
            return;
        let btn = table.querySelector(".ui-button");
        if (btn != null) {
            if (btn.innerText.includes(":")) {
                let [min, sec] = btn.innerText.split(':');
                if (sec == null)
                    sec = parseInt(min);
                else
                    sec = parseInt(sec) + parseInt(min) * 60;
                if (sec > 30)
                    sec = Math.floor(sec / 2);
                console.log(`after ${sec}s reload`);
                setTimeout(() => location.reload(true), sec * 1000);
            }
            else {
                btn.click();
                if (interval_id != -1) {
                    clearInterval(interval_id);
                    interval_id = -1;
                }
            }
        }
        else {
            if (interval_id != -1)
                clearInterval(interval_id);
            interval_id = setInterval(AutoClickOrWait, 60 * 60 * 1000);
        }
    };
    interval_id = setInterval(AutoClickOrWait, 5000);
})();
