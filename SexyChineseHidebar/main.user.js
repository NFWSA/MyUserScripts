// ==UserScript==
// @name         SexyChinese Hidebar
// @namespace    SN_SCHidebar
// @version      0.1
// @description  hide sexyChinese's sidebar and header
// @author       SurgeNight
// @match        https://www.sexychinese.net/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

function hides() {

    var t = document.getElementsByTagName("h1")[0];
    if(t.className == "post-title entry-title")
        ; //t.remove();

    document.getElementsByClassName("sidebar s1")[0].remove(); //.innerHTML = "";
    document.getElementsByClassName("sidebar s2")[0].remove(); //.innerHTML = "";
    document.getElementById("header").remove();
    document.getElementsByClassName("sharedaddy sd-sharing-enabled")[0].remove();
    document.getElementsByClassName("sharedaddy sd-block sd-like jetpack-likes-widget-wrapper jetpack-likes-widget-loaded")[0].remove();
    document.getElementsByClassName("post-nav group")[0].remove();
    document.getElementById("comments").remove();
    document.getElementById("footer").remove();
}

hides();
