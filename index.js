// how to save
// http://www.2cto.com/kf/201411/351586.html
var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var fs = require('fs');
var path = require('path');

var app = express();
var cnodeUrl = 'https://cnodejs.org/';
var testUrl = 'http://127.0.0.1:8080/';

// superagent.get('http://www.javlibrary.com/cn/')
// 		.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
// 		.set('cookie', '__cfduid=dfcf4e41d8bc0e39987d57954b2ebb5f01454571337; __qca=P0-1280019956-1454571338891; timezone=-480; userid=zhaifujun; session=nheoucjnk%2FzqlrQzIiw1lmJwdYjFXobX60UH2ZjtpKD0i1TVuDdWSkA2uyHXkQIQq2rLRsVUdGqwVCrgLjfD8A%3D%3D+%3B+cb751645731b58dd111a387186f9d70ec87bca92+%3B+-65536; __atuvc=39%7C6%2C1%7C7%2C14%7C8%2C0%7C9%2C6%7C10; __utma=45030847.1006409450.1454571385.1457451432.1457538274.13; __utmb=45030847.4.10.1457538274; __utmc=45030847; __utmz=45030847.1454571385.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)')
// 		.set('Accept-Encoding', 'gzip, deflate, sdch')
// 		.set('Accept-Language', 'zh-CN,zh;q=0.8')
// 		.set('x-client-data', 'CKS2yQEIwbbJAQj9lcoB')
// 		.set('x-chrome-uma-enabled', '1')
// 		.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36')
// 		.set('Proxy-Connection', 'keep-alive')
// 		.set('Cache-Control', 'no-cache')
// 		.set('Host', 'www.javlibrary.com')
// 		.set('Pragma', 'no-cache')
// 		.set('Proxy-Connection', 'keep-alive')
// 		.set('Upgrade-Insecure-Requests', '1')
// 		.end(function(err, sres){
// 			if (err) {
// 				console.log('err');
// 				// return next(err);
// 			}
// 			else {
// 				console.log(sres.text);
// 				var $ = cheerio.load(sres.text);
// 				var items = [];
// 				$('.videothumblist .videos .video a').each(function(i, e) {
// 					var img_url = $(this).find('img').attr('src');
// 					var title = $(this).attr('title');
// 					items.push({
// 						title: title,
// 						img: img_url
// 					});
// 				});
// 				var save_json = {
// 					data: items
// 				};
// 				fs.writeFile(path.join(__dirname, 'heihei.js'), JSON.stringify(save_json), function(err) {
// 					if (err) throw err;
// 					console.log('export Account success');
// 				});
// 			}
			
// 		})

app.get('/test', function(req, res, next) {
	superagent.get(testUrl)
		.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
		.set('cookie', '__cfduid=dfcf4e41d8bc0e39987d57954b2ebb5f01454571337; __qca=P0-1280019956-1454571338891; timezone=-480; userid=zhaifujun; session=nheoucjnk%2FzqlrQzIiw1lmJwdYjFXobX60UH2ZjtpKD0i1TVuDdWSkA2uyHXkQIQq2rLRsVUdGqwVCrgLjfD8A%3D%3D+%3B+cb751645731b58dd111a387186f9d70ec87bca92+%3B+-65536; __atuvc=39%7C6%2C1%7C7%2C14%7C8%2C0%7C9%2C6%7C10; __utma=45030847.1006409450.1454571385.1457451432.1457538274.13; __utmb=45030847.4.10.1457538274; __utmc=45030847; __utmz=45030847.1454571385.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)')
		.set('Accept-Encoding', 'gzip, deflate, sdch')
		.set('Accept-Language', 'zh-CN,zh;q=0.8')
		.set('x-client-data', 'CKS2yQEIwbbJAQj9lcoB')
		.set('x-chrome-uma-enabled', '1')
		.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36')
		.set('Proxy-Connection', 'keep-alive')
		.set('Cache-Control', 'no-cache')
		.set('Host', 'www.javlibrary.com')
		.set('Pragma', 'no-cache')
		.set('Proxy-Connection', 'keep-alive')
		.set('Upgrade-Insecure-Requests', '1')
		.end(function(err, sres){
			if (err) {
				console.log(err);
				return res.send('error:' + sres);
			}
			res.send(sres.text);
		})
});

app.get('/fhdq', function(req, res, next) {
	console.log('to get http://www.fanhaowang.info/')
	superagent.get('http://www.fanhaowang.info/')
		.set('Accept-Language','zh-CN,zh;q=0.8')
		.end(function(err, sres){
			if (err) {
				console.log('err');
				return res.send('error' + sres);
				// return next(err);
			}
			var $ = cheerio.load(sres.text);
			var items = [];
			$('#mainbg ul li a').each(function(i, e) {
				var img_url = $(this).find('img').attr('src');
				var title = $(this).text();
				items.push({
					title: title,
					img: img_url
				});
			});
			var save_json = {
				data: items
			};
			fs.writeFile(path.join(__dirname, 'heihei.js'), JSON.stringify(save_json), function(err) {
				if (err) throw err;
				console.log('export Account success');
				res.send('ok')
			});

		})
})
app.get('/s', function(req, res, next) {
	superagent.get('http://www.javlibrary.com/en/')
		.set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
		.set('Accept-Encoding', 'gzip, deflate, sdch')
		.set('Accept-Language', 'zh-CN,zh;q=0.8')
		.set('x-client-data', 'CKS2yQEIwbbJAQj9lcoB')
		.set('x-chrome-uma-enabled', '1')
		.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36')
		.set('Proxy-Connection', 'keep-alive')
		.set('Cache-Control', 'no-cache')
		.set('Host', 'www.javlibrary.com')
		.set('Pragma', 'no-cache')
		.set('Proxy-Connection', 'keep-alive')
		.set('Upgrade-Insecure-Requests', '1')
		.end(function(err, sres){
			if (err) {
				console.log('err');
				return res.send('error' + sres);
				// return next(err);
			}
			var $ = cheerio.load(sres.text);
			var items = [];
			$('.videothumblist .videos .video a').each(function(i, e) {
				var img_url = $(this).find('img').attr('src');
				var title = $(this).attr('title');
				items.push({
					title: title,
					img: img_url
				});
			});
			res.send(items);
		})
});

app.get('/', function(req, res, next) {
	superagent.get('https://cnodejs.org/')
		.end(function(err, sres){
			if (err) {
				return next(err);
			}
			var $ = cheerio.load(sres.text);
			var items = [];
			$('#topic_list .topic_title').each(function(i, e) {
				var $element = $(e);
				// items.push({
				// 	title: $element.attr('title'),
				// 	href: $element.attr('href')
				// });
				var href = url.resolve(cnodeUrl, $element.attr('href'));
				items.push(href);
			});
			// res.send(items);
			console.log(items);
			// 多线程执行
			var ep = new eventproxy();
			ep.after('topic_html', items.length, function(topics) {
				topics = topics.map(function(topicPair) {
					var topicUrl = topicPair[0];
					var topicHtml = topicPair[1];
					var $ = cheerio.load(topicHtml);
					return ({
						title: $('.topic_full_title').text().trim(),
						href: topicUrl,
						comment1: $('.reply_content').eq(0).text().trim()
					});
				});
				console.log('final:');
				console.log(topics);
			});
			items.forEach(function(topicUrl) {
				superagent.get(topicUrl)
					.end(function(err, res) {
						console.log('fetch ' + topicUrl + ' successful');
						ep.emit('topic_html', [topicUrl, res.text]);
					});
			});
		})
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});