var app = require('./src/app');

app.listen(3000, function(err){
	if (err) {throw err}
	console.log('启动服务监听3000端口！')
})