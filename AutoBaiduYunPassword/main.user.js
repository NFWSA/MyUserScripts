// ==UserScript==
// @name         Auto BaiduYun Password
// @namespace    AutoPanBD
// @version      0.3
// @description  auto input password with arg pwd at pan.baidu.com
// @author       SurgeNight
// @match        http*://pan.baidu.com/s*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    function InputPwd(pwd) {
        let cid = setInterval(function(){
            console.log('auto password is :' + pwd);
            let ins = document.querySelector("#accessCode");
            let btn = document.querySelector("#submitBtn");
            if (ins && btn) {
                ins.value = pwd;
                btn.click();
                clearInterval(cid);
            }
        }, 200);
    }
    let param = window.name;
    if (param.match('AutoPwdPan=') !== null) {
        InputPwd(param.substr(11));
    }
    else {
        let chs = [String.fromCharCode(160), ':', '：', ' ', '　', "%20"];
        let link = location.href;
        let valid = false;
        for (let ch of chs) {
            if (link.split(ch).length > 1) {
                valid = true;
                break;
            }
        }
        if (!valid)
            return;
        let text = link.trim().split('\n');
        let pwd = text[text.length - 1];
        for (let ch of chs) {
            pwd = pwd.split(ch);
            pwd = pwd[pwd.length - 1];
        }
        text = location.href.replace("http:", "").replace("https:", "");
        console.log(text);
        for (let ch of chs) {
            text = text.split(ch)[0];
        }
        console.log(text);
        console.log('AutoPwdPan=' + pwd);
        InputPwd(pwd);
    }
})();
