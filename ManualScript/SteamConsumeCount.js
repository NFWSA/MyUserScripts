// 没有考虑退款情况
// 钱包统计有误
// 部分混合消费统计有误

// 付款总额 与 钱包消费总额
payrlt = 0;
pacRlt = 0;
mtp = '';
jQuery('tr.wallet_table_row').each(
    function(i, ele){
        payt = ele.getElementsByClassName('wth_payment')[0].innerText.trim();
        pr = ele.getElementsByClassName('wht_total')[0];
        pr = pr.innerText.split(' ');
        mtp = pr[0];
        pr = Number(pr[1]);
        if (payt == '钱包')
            pacRlt += pr;
        else
            payrlt += pr;
    }
);
alert('总花费：' + mtp + ' ' + payrlt + '\n钱包消费：' + mtp + ' ' + pacRlt);
