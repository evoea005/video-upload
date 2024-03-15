const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "videoupload",
});

module.exports = connection;
