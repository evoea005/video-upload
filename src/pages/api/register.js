import { con } from "./connect";


export const POST = async ({ request }) => {
	const { username, password } = await request.json();


	con.connect(function (err) {
		if (err) throw err;
		const sql = `INSERT INTO user (username, password) VALUES ('${username}', '${password}')`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(`user registered with id: ${result.insertId} and username: ${username}`);
		});
	});
	return new Response({ status: 200, body: { success: true } });
};
