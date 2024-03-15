// TODO: MAKE IT WORK FSOFIJhd

import { con } from "./connect";

export const GET = async ({ request }) => {
	const { username } = await request.json();

	con.connect(function (err) {
		if (err) throw err;
		const sql = `SELECT * FROM user WHERE username = '${username}'`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			if (result.length > 0) {
				return new Response({ status: 200, body: { found: true } });
			}
			else {
				return new Response({ status: 200, body: { found: false } });
			}
		});
	});
};

