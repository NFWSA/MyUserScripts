// Steam愿望单 价格统计
normalPrice = 0, disOriPrice = 0, disPrice = 0, futureGame = 0;
money = '¥';
normalGameCnt = 0, freeGameCnt = 0, disGameCnt = 0, invaildGameCnt = 0;
disMax = 0, disMin = 100;
disMaxGame = '', disMinGame = '';
invaildGamelist = '';
invaildList = [], disList = [], freeList = [], futureList = [];
var list = jQuery('div#wishlist_items')[0];
var items = list.getElementsByClassName('wishlistRow');

function headLine(name, id, color = '#66ccff') {
    var ele = document.createElement('div');
    ele.addClassName('wishlistRow');
    ele.style.textAlign = 'center';
    ele.style.color = color;
    ele.style.fontSize = '2em';
    ele.innerText = name;
    ele.id = id;
    return ele;
}

function adjustPos(ele, index = null) {
    if (null != index)
        return list.insertBefore(ele, items[index]);
    return list.appendChild(ele);
}

jQuery('div.wishlistRow').each(
    function (i, ele) {
        childEle = ele.getElementsByClassName('price')[0];
        if (null != childEle) {
            // 免费游戏
            if (childEle.innerText.include('Free')) {
                ++freeGameCnt;
                freeList = freeList.concat(ele);
            }
            else {
                let price = childEle.innerText.trim().split(' ');
                if (price.length <= 1) {
                    // 未发行游戏
                    ++futureGame;
                    futureList = futureList.concat(ele);
                    return;
                }
                // 付费游戏
                if (money != price[0])
                    money = price[0];
                normalPrice += Number.parseInt(price[1]);
                ++normalGameCnt;
            }
        }
        else {
            childEle = ele.getElementsByClassName('discount_block discount_block_inline')[0];
            if (null != childEle) {
                // 折扣中游戏
                let discount = childEle.getElementsByClassName('discount_pct')[0].innerText;
                discount = Number.parseInt(discount.substr(1, discount.length - 2));
                if (discount > disMax) {
                    disMax = discount;
                    disMaxGame = childEle.parentElement.parentElement.getElementsByClassName('ellipsis')[0].innerText;
                }
                if (discount < disMin) {
                    disMin = discount;
                    disMinGame = childEle.parentElement.parentElement.getElementsByClassName('ellipsis')[0].innerText;
                }
                let price = childEle.getElementsByClassName('discount_original_price')[0].innerText.trim().split(' ');
                if (money != price[0])
                    money = price[0];
                disOriPrice += Number.parseInt(price[1]);
                price = childEle.getElementsByClassName('discount_final_price')[0].innerText.trim().split(' ');
                if (money != price[0])
                    money = price[0];
                disPrice += Number.parseInt(price[1]);
                console.log(invaildGameCnt + disGameCnt + 2);
                adjustPos(ele, list.getElementsByClassName('wishlistRow')[invaildGameCnt + 2]);
                ++disGameCnt;
                disList = disList.concat(ele);
            }
            else {
                var name = ele.getElementsByClassName('ellipsis')[0];
                if (null != name) {
                    // 失效游戏
                    invaildGamelist += '\n    ' + name.innerText;
                    ++invaildGameCnt;
                    invaildList = invaildList.concat(ele);
                }
            }
        }
    }
);

var invaildHead = adjustPos(headLine('-- 失效 游戏 名单 --', 'invaild', '#666666'), 0);
var disHead = adjustPos(headLine('-- 折扣 游戏 名单 --', 'discount', '#ccff66'), 1);
var freeHead = adjustPos(headLine('-- 免费 游戏 名单 --', 'free'), 2);
var normalHead = adjustPos(headLine('-- 普通 游戏 名单 --', 'normal', '#ffffff'), 3);
var futureHead = adjustPos(headLine('-- 未发行 游戏 名单 --', 'future', '#999999'));

for (var i = 0; i < invaildList.length; ++i) {
    list.insertBefore(invaildList[i], disHead);
}
for (var i = 0; i < disList.length; ++i) {
    list.insertBefore(disList[i], freeHead);
}
for (var i = 0; i < freeList.length; ++i) {
    list.insertBefore(freeList[i], normalHead);
}
for (var i = 0; i < futureList.length; ++i) {
    list.appendChild(futureList[i]);
}

var space = '&nbsp;&nbsp;&nbsp;&nbsp;', newline = '<br />';
rlt = '总游戏数量：' + (freeGameCnt + normalGameCnt + disGameCnt + futureGame) + newline;
rlt += space + '<a href="#free">免费数量</a>：' + freeGameCnt + newline;
rlt += space + '<a href="#normal">付费数量</a>：' + normalGameCnt + newline;
rlt += space + '<a href="#discount">折扣数量</a>：' + disGameCnt + newline;
rlt += space + '<a href="#future">未发行数量</a>：' + futureGame + newline + newline;
rlt += '当前总需要花费：' + money + (normalPrice + disPrice) + newline;
rlt += space + '普通游戏：' + money + normalPrice + newline;
rlt += space + '折扣游戏：' + money + disPrice + newline;
if (0 != disPrice) {
    rlt += newline;
    rlt += '无折扣总需花费：' + money + (normalPrice + disOriPrice) + newline;
    rlt += space + '差价： ' + money + (disOriPrice - disPrice) + newline;
    rlt += newline;
    rlt += '折扣最高游戏：' + newline + space + '-' + disMax + '%' + space + disMaxGame.escapeHTML() + newline;
    rlt += '折扣最低游戏：' + newline + space + '-' + disMin + '%' + space + disMinGame.escapeHTML() + newline;
}
else
    list.removeChild(disHead);
if ('' != invaildGamelist) {
    rlt += newline;
    rlt += '<a href="#invaild">失效游戏列表</a>：' + invaildGamelist.escapeHTML();
}
else
    list.removeChild(invaildHead);
if (0 == freeGameCnt) list.removeChild(freeHead);
if (0 == futureGame) list.removeChild(futureHead);
var ele = document.createElement('div');
ele.addClassName('wishlistRow');
ele.style.paddingLeft = '14em';
ele.style.color = '#ffffff';
ele.style.fontSize = '1.2em';
ele.innerHTML = rlt;
list.insertBefore(ele, list.children[0]);
