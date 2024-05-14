import { con } from "./connect";
import crypto from "crypto";

export const POST = async ({ request }) => {
	try {
		const { username, password } = await request.json();

		const sql = `SELECT * FROM user WHERE username = ? AND password = ?`;

		const [result] = await con.promise().query(sql, [username, password]);

		// if account exists
		if (result.length > 0) {
			//generate session token key thing
			var session = crypto.randomBytes(32).toString("hex");

			const sql = `UPDATE user SET session = '${session}' WHERE username = '${username}' AND password = '${password}'`;

			con.query(sql, function (err, result) {
				if (err) throw err;
			});
			
			return new Response(
				JSON.stringify({
					session: session,
				}),
				{ status: 200 }
			);
		} else {
			return new Response(
				JSON.stringify({
					error: "invalid login",
				}),
				{ status: 401 }
			);
		}
	} catch (err) {
		console.error(err);
		return new Response(
			JSON.stringify({
				error: "internal server error",
			}),
			{ status: 500 }
		);
	}
};
