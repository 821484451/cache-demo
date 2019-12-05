const mysql = require("mysql");
const cfg = {
	host: "localhost",
	user: "root",
	password: "root",
	database: "study"
};
// 创建连接
const conn = mysql.createConnection(cfg);

//连接
conn.connect(err => {
	if (err) {
		throw err;
	}else {
		console.log("连接成功！");
	}
});

// 创建表 
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test ( 
	id INT NOT NULL AUTO_INCREMENT, 
	userName VARCHAR(45) NULL,
	sex VARCHAR(45) NULL,
	age INT NULL,  
	PRIMARY KEY (id))`; 

conn.query(CREATE_SQL, err => {
	if (err) {
		throw err;
	}
})

module.exports = conn;