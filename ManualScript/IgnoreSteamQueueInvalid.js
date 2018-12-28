javascript:
(function () {
	var str = window.location.href;
	str = str.substr(str.indexOf('app') + 4).split('/')[0];
	$J.post("/app/" + str, { sessionid: g_sessionID, appid_to_clear_from_queue: Number.parseInt(str) });
	window.location.href = "https://store.steampowered.com/explore/";
	window.open("https://steamdb.info/app/" + str);
})();