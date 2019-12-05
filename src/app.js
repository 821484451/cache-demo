const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const cache = require('./middleWare/cache'); // 中间件
const fs  = require('fs');
const path = require('path');
const cacheDire = path.resolve(__dirname, '../cache');


app.use(cache);
app.use(router.routes());

var timer = setInterval(()=> {
	var date = new Date();
	var curHour = date.getHours();
	var curMin = date.getMinutes();
	var curSecond = date.getSeconds();
	if (curHour == '00' && curMin == '00' && curSecond == '00') {
		fs.unlink(cacheDire + '/user.json', (err) => {
		  	if (err) throw err;
		  	fs.rmdir(cacheDire, function(err){
				if (err){
					console.log(err);
				}
			});
		});
		
	};

},1000);

module.exports = app;
