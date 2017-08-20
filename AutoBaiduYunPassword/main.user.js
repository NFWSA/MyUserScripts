// ==UserScript==
// @name         Auto BaiduYun Password
// @namespace    AutoPanBD
// @version      0.1
// @description  auto input password with arg pwd at pan.baidu.com
// @author       SurgeNight
// @match        http*://pan.baidu.com/s*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

//param = document.location.search.substr(1);
param = window.name;
if(param.match('AutoPwdPan=')!==null){
    param = param.substr(11);
    document.getElementById('accessCode').value = param;
    document.getElementById('submitBtn').click();
}

// client side code
// text = window.getSelection().toString().trim();
// text = text.split(' ');
// pwd = text[text.length - 1];
// pwd = pwd.split(':');
// pwd = pwd[pwd.length - 1];
// pwd = pwd.split('：');
// pwd = pwd[pwd.length - 1];
// text = text[0];
// window.open(text, 'AutoPwdPan=' + pwd);
