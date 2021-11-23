// ==UserScript==
// @name         Steam GameList Count
// @namespace    SteamGameListCount
// @version      0.11.1
// @description  auto count the amount of all games played time in steam game list.
// @author       SurgeNight
// @match        http*://steamcommunity.com/*/*/games/?tab=all*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    // Steam游戏列表 统计
    let gameTime = 0.0;
    let timeLab = '小时';
    let playedCnt = 0, neverCnt = 0;
    let preferTime = 0;
    let preferGame = '';
    let preferRecord = null;
    let playedList = [];

    let list = jQuery('div#games_list_rows')[0];
    let items = jQuery('div.gameListRow');

    function headLine(name, id, color = '#66ccff') {
        let ele = document.createElement('div');
        ele.addClassName('gameListRow');
        ele.style.textAlign = 'center';
        ele.style.color = color;
        ele.style.fontSize = '2em';
        ele.innerText = name;
        ele.id = id;
        return ele;
    }

    function adjustPos(ele, index = null) {
        if (null !== index)
            return list.insertBefore(ele, items[index]);
        return list.appendChild(ele);
    }

    items.each(function (i, ele) {
        let childEle = ele.getElementsByClassName('ellipsis hours_played')[0];
        if (null !== childEle) {
            if (childEle.innerText === '') {
                ++neverCnt;
                return;
            }
            times = childEle.innerText.split(' ');
            if (timeLab != times[2])
                timeLab = times[2];
            times = Number.parseFloat(times[1].replace(",", ""));
            gameTime += times;
            ++playedCnt;
            playedList = playedList.concat(ele);
            if (times > preferTime) {
                preferTime = times;
                preferRecord = ele;
                preferGame = ele.getElementsByClassName('gameListRowItemName ellipsis')[0].innerText;
            }
        }
    });

    preferRecord.id = "prefer";
    preferRecord.getElementsByClassName('gameListRowItemName ellipsis')[0].style.color = "#EE0011";
    preferRecord.getElementsByClassName('gameListRowItemName ellipsis')[0].innerText += " (最喜欢的)";

    let playedHead = adjustPos(headLine('-- 已玩过的 游戏 名单 --', 'played', '#ccff66'), 0);
    let neverHead = adjustPos(headLine('-- 从未玩过的 游戏 名单 --', 'never', '#cccccc'), 1);

    for (let i = 0; i < playedList.length; ++i) {
        list.insertBefore(playedList[i], neverHead);
    }

    let space = '&nbsp;&nbsp;&nbsp;&nbsp;', newline = '<br />';
    rlt = '总游戏数量：' + (playedCnt + neverCnt) + newline;
    if (playedCnt !== 0) {
        rlt += space + '<a href="#played">已玩过的游戏数量</a>：' + playedCnt + newline;
        rlt += space + space + '总游戏时间：' + gameTime + ' ' + timeLab + newline;
        rlt += space + '<a href="#prefer">最喜欢的游戏</a>：' + newline;
        rlt += space + space + '游戏名称：' + preferGame + newline;
        rlt += space + space + '游戏时间：' + preferTime + ' ' + timeLab + newline + newline;
    }
    if (neverCnt !== 0) {
        rlt += space + '<a href="#never">从未玩过的游戏数量</a>：' + neverCnt + newline;
    }

    let ele = document.createElement('div');
    ele.addClassName('gameListRow');
    ele.style.paddingLeft = '14em';
    ele.style.color = '#ffffff';
    ele.style.fontSize = '1.2em';
    ele.innerHTML = rlt;
    list.insertBefore(ele, list.children[0]);
})();
