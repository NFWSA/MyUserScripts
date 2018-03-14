// ==UserScript==
// @name         Steam Wishlist Count
// @namespace    SteamWishlistCount
// @version      0.3.1
// @description  auto count the price of all games in steam wishlist.
// @author       SurgeNight
// @match        http*://store.steampowered.com/wishlist/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

// Steam愿望单 价格统计
(function wishlistCount()
{
	if (!g_Wishlist || !g_Wishlist.rgAllApps) {
		return window.requestAnimationFrame(wishlistCount);
	}

	let normalPrice = 0, disOriPrice = 0, disPrice = 0, futureGame = 0;
	let money = '¥';
	let normalGameCnt = 0, freeGameCnt = 0, disGameCnt = 0, invaildGameCnt = 0;
	let disMax = 0, disMin = 100;
	let disMaxGame = '', disMinGame = '';
	let normalList = [], invaildList = [], disList = [], freeList = [], futureList = [];
	var list = g_Wishlist.rgAllApps;

	g_Wishlist.rgAllApps.each(
		function (idx, i) {
			var ele = g_Wishlist.rgElements[idx][0];
			childEle = ele.getElementsByClassName('discount_final_price')[0];
			if (null != childEle) {
				let price = childEle.innerText.trim().split(' ');
				childEle = ele.getElementsByClassName('discount_pct')[0];
				if (null != childEle) {
					// 折扣中游戏
					let discount = ele.getElementsByClassName('discount_pct')[0].innerText;
					discount = Number.parseInt(discount.substr(1, discount.length - 2));
					if (discount > disMax) {
						disMax = discount;
						disMaxGame = g_rgAppInfo[idx];
					}
					if (discount < disMin) {
						disMin = discount;
						disMinGame = g_rgAppInfo[idx];
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
					disList = disList.concat(idx);
				}
				else {
					// 付费游戏
					if (money != price[0])
						money = price[0];
					normalPrice += Number.parseInt(price[1]);
					++normalGameCnt;
					normalList = normalList.concat(idx);
				}

			}
			else {
				// 免费游戏
				if (g_rgAppInfo[idx].free) {
					++freeGameCnt;
					freeList = freeList.concat(idx);
				}
			    else {
				    // 未发行游戏
				    if (g_rgAppInfo[idx].rank == '9999999') {
						++futureGame;
						futureList = futureList.concat(idx);
				    }
				    // 失效游戏
				    else {
						++invaildGameCnt;
						var title = g_Wishlist.rgElements[idx][0].getElementsByClassName('title')[0];
						title.style.color = '#666666';
						title.innerText = title.innerText.trim() + '(可能已失效)';
					    invaildList = invaildList.concat(idx);
					}
				}
			}
		}
	);

	// var invaildHead = adjustPos(headLine('-- 失效 游戏 名单 --', 'invaild', '#666666'), 0);
	// var freeHead = adjustPos(headLine('-- 免费 游戏 名单 --', 'free'), 1);
	// var disHead = adjustPos(headLine('-- 折扣 游戏 名单 --', 'discount', '#ccff66'), 2);
	// var normalHead = adjustPos(headLine('-- 普通 游戏 名单 --', 'normal', '#ffffff'), 3);
	// var futureHead = adjustPos(headLine('-- 未发行 游戏 名单 --', 'future', '#999999'));

	g_Wishlist.rgAllApps = [];
	g_Wishlist.rgAllApps = g_Wishlist.rgAllApps.concat(invaildList);
	g_Wishlist.rgAllApps = g_Wishlist.rgAllApps.concat(freeList);
	g_Wishlist.rgAllApps = g_Wishlist.rgAllApps.concat(disList);
	g_Wishlist.rgAllApps = g_Wishlist.rgAllApps.concat(normalList);
	g_Wishlist.rgAllApps = g_Wishlist.rgAllApps.concat(futureList);

	var space = '&nbsp;&nbsp;&nbsp;&nbsp;', newline = '<br />';
	rlt = '总游戏数量：' + (freeGameCnt + normalGameCnt + disGameCnt + futureGame) + newline;
	rlt += space + '免费数量：' + freeGameCnt + newline;
	rlt += space + '付费数量：' + normalGameCnt + newline;
	rlt += space + '折扣数量：' + disGameCnt + newline;
	rlt += space + '未发行数量：' + futureGame + newline + newline;
	rlt += '当前总需要花费：' + money + (normalPrice + disPrice) + newline;
	rlt += space + '普通游戏：' + money + normalPrice + newline;
	rlt += space + '折扣游戏：' + money + disPrice + newline;
	if (0 != disPrice) {
		rlt += newline;
		rlt += '无折扣总需花费：' + money + (normalPrice + disOriPrice) + newline;
		rlt += space + '差价： ' + money + (disOriPrice - disPrice) + newline;
		rlt += newline;
		rlt += '折扣最高游戏：' + newline + space + '-' + disMax + '%' + space + disMaxGame.name.escapeHTML() + newline;
		rlt += '折扣最低游戏：' + newline + space + '-' + disMin + '%' + space + disMinGame.name.escapeHTML() + newline;
	}
	if (0 != invaildGameCnt) {
		rlt += newline;
		rlt += '失效游戏列表：' + newline;
		for (var i = 0; i < invaildList.length; ++i) {
			rlt += space + g_rgAppInfo[invaildList[i]].name.escapeHTML() + newline;
		}
	}
	var ele = document.createElement('div');
	ele.addClassName('wishlist_header');
	ele.id = 'steam_wishlist_count';
	ele.style.paddingLeft = '14em';
	ele.style.color = '#ffffff';
	ele.style.fontSize = '1.2em';
	ele.innerHTML = rlt;
	jQuery("div.page_content")[0].insertBefore(ele, jQuery("div.page_content div.controls")[0]);
	g_Wishlist.Update();
}) ();
