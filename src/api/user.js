var mysql = require("mysql");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "videoupload",
});

con.connect(function (err) {
	if (err) throw err;
});

// i dont know