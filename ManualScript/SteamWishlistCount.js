// Steam愿望单 商品统计

// 没有考虑退款情况
// 钱包统计有误
// 部分混合消费统计有误

normalPrice = 0, disOriPrice = 0, disPrice = 0;
money = '¥';
normalGameCnt = 0, freeGameCnt = 0, disGameCnt = 0;
disMax = 0, disMin = 100;
disMaxGame = '', disMinGame = '';
// 非打折游戏
jQuery('div.price').each(
    function(i, ele){
        // 免费游戏
        if (ele.innerText.include('Free')) {
            ++freeGameCnt;
        }
        // 付费游戏
        else {
            let price = ele.innerText.trim().split(' ');
            if (money != price[0])
                money = price[0];
            normalPrice += Number.parseInt(price[1]);
            ++normalGameCnt;
        }
    }
);
// 折扣中游戏
jQuery('div.discount_block.discount_block_inline').each(
    function(i, ele){
        let discount = ele.getElementsByClassName('discount_pct')[0].innerText;
        discount = Number.parseInt(discount.substr(1, discount.length - 2));
        if (discount > disMax) {
            disMax = discount;
            disMaxGame = ele.parentElement.parentElement.getElementsByClassName('ellipsis')[0].innerText;
        }
        if (discount < disMin) {
            disMin = discount;
            disMinGame = ele.parentElement.parentElement.getElementsByClassName('ellipsis')[0].innerText;
        }
        let price = ele.getElementsByClassName('discount_original_price')[0].innerText.trim().split(' ');
        if (money != price[0])
            money = price[0];
        disOriPrice += Number.parseInt(price[1]);
        price = ele.getElementsByClassName('discount_final_price')[0].innerText.trim().split(' ');
        if (money != price[0])
            money = price[0];
        disPrice += Number.parseInt(price[1]);
        ++disGameCnt;
    }
);
rlt = '总游戏数量：' + (freeGameCnt + normalGameCnt + disGameCnt) + '\n';
rlt += '    免费数量：' + freeGameCnt + '\n';
rlt += '    付费数量：' + normalGameCnt + '\n';
rlt += '    折扣数量：' + disGameCnt + '\n\n';
rlt += '当前总需要花费：' + money + (normalPrice + disPrice) + '\n';
rlt += '    普通游戏：' + money + normalPrice + '\n';
rlt += "    折扣游戏：" + money + disPrice + '\n\n';
rlt += '无折扣总需花费：' + money + (normalPrice + disOriPrice) + '\n';
rlt += '    差价：' + money + (disOriPrice - disPrice) + '\n\n';
rlt += '折扣最高游戏：\n    -' + disMax + '%    ' + disMaxGame + '\n';
rlt += '折扣最低游戏：\n    -' + disMin + '%    ' + disMinGame + '\n';
alert(rlt);
