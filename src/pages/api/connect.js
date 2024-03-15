import mysql from "mysql2";

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "videoupload",
});

export { con };
