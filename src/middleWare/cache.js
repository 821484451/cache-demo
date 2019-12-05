// 做一个中间件用来缓存
// 需求： 1.访问接口/user的时候,去先查询cache文件夹里是否有user.json,有则访问;2.无则访问数据库，去生成缓存文件
const fs  = require('fs');
const path = require('path');
const conn = require('../db');
const cacheDire = path.resolve(__dirname, '../../cache');
const SELECT_SQL = `SELECT * FROM test`;


function cache (ctx, next) {
	if (ctx.url === '/user') {
		// 判断目录是否存在
		fs.exists(cacheDire, function(exists) {
			// 不存在，创建目录，并生成文件
		  if (exists) {
		  	fs.exists(cacheDire + '/user.json', function(exi) {
		  		if (exi) {

		  		}else{
					  conn.query(SELECT_SQL, (err, result) => {
							fs.writeFile(cacheDire + '/user.json', JSON.stringify(result), (err) => {
							  if (err) throw err;
							});
						});
		  		}
		  	})
		  }else{
		  	fs.mkdir(cacheDire, { recursive: true }, function(err){
					 if(err){
					  console.log(err);
					 }else{
					  console.log("creat done!");
					  conn.query(SELECT_SQL, (err, result) => {
							ctx.body = result;
							fs.writeFile(cacheDire + '/user.json', JSON.stringify(result), (err) => {
							  if (err) throw err;
							});
						})
					  
					 }
				})
		  } 
		});
	}
		

	next();
	
}

module.exports = cache;