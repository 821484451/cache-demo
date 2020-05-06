const router = require('koa-router')();
const fs  = require('fs');
const path = require('path');
const cacheDire = path.resolve(__dirname, '../cache/user.json');
const {promisify} = require('util')
const readFile = promisify(fs.readFile)

router.get('/user', async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	var data = fs.readFileSync(cacheDire)
	ctx.body = data;
	
});

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json'
	}
});
//后边可以继续添加路由

module.exports = router;