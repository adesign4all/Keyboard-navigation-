jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1
		};
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
			} else {
				date = options.expires
			};
			expires = '; expires=' + date.toUTCString()
		};
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break
				}
			}
		};
		return cookieValue
	}
};

var f = getCookie("FIRSTTIME");
if (f == 'OVER') {} else {
	setCookie("AJ0", "//www.facebook.com", "/", null, false);
	setCookie("AJ1", "//www.twitter.com", "/", null, false);
	setCookie("AJ2", "//www.instagram.com", "/", null, false);
	setCookie("AJ3", "//www.github.com", "/", null, false);
	setCookie("AJ4", "//www.guoaguoa.com", "/", null, false);
	setCookie("AJ5", "http://www.sina.com.cn", "/", null, false);
	setCookie("AJ6", "http://www.sohu.com", "/", null, false);
	setCookie("AJ7", "http://www.163.com", "/", null, false);
	setCookie("AJ8", "http://www.youku.com", "/", null, false);
	setCookie("AJ9", "//www.bilibili.com", "/", null, false);
	setCookie("AJA", "//www.youtube.com", "/", null, false);
	setCookie("AJB", "//www.Wikipedia.org", "/", null, false);
	setCookie("AJC", "//amazon.com", "/", null, false);
	setCookie("AJD", "//live.com", "/", null, false);
	setCookie("AJE", "http://netflix.com", "/", null, false);
	setCookie("AJF", "http://www.whatsapp.com/", "/", null, false);
	setCookie("AJG", "//www.Reddit.com", "/", null, false);
	setCookie("AJH", "//www.bing.com", "/", null, false);
	setCookie("AJI", "//ebay.com", "/", null, false);
	setCookie("AJJ", "//www.linkedin.com", "/", null, false);
	setCookie("AJK", "http://www.msn.com", "/", null, false);
	setCookie("AJL", "http://www.office.com", "/", null, false);
	setCookie("AJM", "//www.pinterest.com", "/", null, false);
	setCookie("AJN", "//Microsoft.com", "/", null, false);
	setCookie("AJO", "http://www.quora.com", "/", null, false);
	setCookie("AJP", "//tumblr.com", "/", null, false);
	setCookie("AJQ", "//www.weather.com", "/", null, false);
	setCookie("AJR", "//adobe.com", "/", null, false);
	setCookie("AJS", "//www.time.com", null, false);
	setCookie("AJT", "//www.nationalgeographic.com", "/", null, false);
	setCookie("AJU", "http://www.fortune.com", "/", null, false);
	setCookie("AJV", "//www.vogue.com", "/", null, false);
	setCookie("AJW", "//www.economist.com", "/", null, false);
	setCookie("AJX", "//www.vanityfair.com", "/", null, false);
	setCookie("AJY", "//www.newsweek.com", "/", null, false);
	setCookie("AJZ", "//www.elle.com", "/", null, false)
};
setCookie("FIRSTTIME", "OVER", "/", null, false);
var urlcache = {};
for (var i = 48; i <= 90; i++) {
	var code = String.fromCharCode(i);
	var v = getCookie("AJ" + code);
	if (v != null && v != '' && typeof(v) != 'undefined') {
		urlcache[code] = v;
		$("#LI_" + code).prepend('<img id="' + code + '" src="' + getico(v) + '" align="center">')
	}
};
$(document).keyup(function(ev) {
	if (ev.ctrlKey) {
		return false;
	}
	var code = String.fromCharCode(ev.keyCode);
	$("#LI_" + code).css('background', '#f90');
	setTimeout('$("#LI_' + code + '").css("background","#fff");', 300);
	if (urlcache[code] == '' || typeof(urlcache[code]) == 'undefined') {
		$("#message").html('Adesign提醒您：请切换您的输入法为英文喔( ⊙o⊙ )');
		setTimeout('$("#message").html("");', 2000)
	} else {
		window.open(urlcache[code])
	}
});
$(".custom li").mouseenter(function() {
	$("#tempdate").val($(this).attr('id').replace("LI_", ""));
	$(this).append('<div class="oper"><span><a onclick="update()" class="edit" title="编辑">E</a></span><span><a onclick="del()" class="del" title="删除">D</a></span></div>')
}).mouseleave(function() {
	$("#tempdate").val('');
	$(".oper").remove()
});
$(".custom li").click(function() {
	var code = $(this).attr('id').replace('LI_', '');
	if (urlcache[code] == '' || typeof(urlcache[code]) == 'undefined') {} else {
		window.open(urlcache[code])
	}
});

function del() {
	var code = $("#tempdate").val();
	urlcache[code] = '';
	$("#" + code).remove();
	deleteCookie("AJ" + code);
	return false
};

function update() {
	var code = $("#tempdate").val();
	$("#LI_" + code).css('background', '#f90');
	var u = window.prompt("请输入键位[" + code + "]对应的网址", "");
	$("#LI_" + code).css('background', '#fff');
	if (u.indexOf('http://') == -1 && u.indexOf('https://') == -1) {
		u = 'http://' + u
	};
	if (!IsURL(u)) {
		alert('网址输入错误!请核对');
		return
	};
	urlcache[code] = u;
	$("#" + code).remove();
	$("#LI_" + code).prepend('<img id="' + code + '" src="' + getico(u) + '" align="center">');
	setCookie("AJ" + code, u, "/", null, false);
	return false
};

function getico(url) {
	var s = url.indexOf("//");
	temp = url.substring(s + 2);
	var s1 = temp.indexOf("/");
	if (s1 == -1) {
		s1 = temp.length
	};
	return url.substring(0, s1 + s + 2) + '/favicon.ico'
};

function setCookie(name, value, path, domain, secure) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
	document.cookie = name + "=" + escape(value) + ((expdate) ? "; expires=" + expdate.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "")
};

function deleteCookie(name) {
	expdate = new Date();
	expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
	setCookie(name, "", expdate)
};

function getCookie(name) {
	var bikky = document.cookie;
	name += "=";
	var i = 0;
	while (i < bikky.length) {
		var offset = i + name.length;
		if (bikky.substring(i, offset) == name) {
			var endstr = bikky.indexOf(";", offset);
			if (endstr == -1) endstr = bikky.length;
			return decodeURIComponent(bikky.substring(offset, endstr))
		};
		i = bikky.indexOf(" ", i) + 1;
		if (i == 0) break
	};
	return null
};

function IsURL(str_url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp(strRegex);
	if (re.test(str_url)) {
		return true
	} else {
		return false
	}
};
$(document).ready(function() {
	$('#q,#网站名,#网址').keyup(function() {
		return false;
	})
});

var manager = new dbxManager('main', 'yes', 'yes', 'button');
var index = new dbxGroup('index', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');
var design = new dbxGroup('design', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');
var frontend = new dbxGroup('frontend', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');
var program = new dbxGroup('program', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');
var mobile = new dbxGroup('mobile', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');
var data = new dbxGroup('data', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');
var webmaster = new dbxGroup('webmaster', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');
var you = new dbxGroup('you', 'vertical', '8', 'no', '10', 'yes', 'closed', 'open', 'close', '', 'click to %toggle% this box', 'use the arrow keys to move this box. ', 'press the enter key to %toggle% this box. ', '%mytitle%  [%dbxtitle%]', 'hit the enter key to select this target', 'sorry, this target cannot be selected');


var开发者本地存储 = localStorage;
var本地存储_添加 = function() {本地存储 ();
		var网站名 = $('#网站名').val();
		var网址 = $('#网址').val();开发者本地存储.setItem(网址, 网站名);
		$('#网址自定义').append('<li><a href="' + 网址 + '">' + 网站名 + '</a><label title="删除">D</label></li>');
	};
var本地存储_读取 = function() {本地存储 ();
		var items = 开发者本地存储.length;
		for (var i = 0; i < items; i++) {
			var网址 = 开发者本地存储.key(i);
			$('#网址自定义').append('<li><a href="' + 网址 + '">' + 开发者本地存储.getItem(网址) + '</a><label title="删除">D</label></li>');
		}
	};
$('#网址自定义 label').live('click', function() {
	var _this = $(this).parent('li');开发者本地存储.removeItem(_this.find('a').attr('href'));
	_this.remove();
});
var本地存储 = function() {
		if (typeof(Storage) !== 'undefined') {
			return true;
		} else {
			alert('Sorry,请选择对HTML5支持较好的浏览器以支持该功能');
			return false;
		}
	};本地存储_读取 ();