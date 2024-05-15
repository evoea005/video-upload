import { con } from "./connect";
import crypto from "crypto";

export const POST = async ({ request }) => {
	try {
		const { session } = await request.json();

		const sql = `SELECT * FROM user WHERE session = ?`;

		const [result] = await con.promise().query(sql, [session]);

		if (result.length > 0) {
			console.log(result[0].username);

			const sql = `SELECT * FROM videos WHERE userid = ?`;

			const [videos] = await con.promise().query(sql, [result[0].id]);

			return new Response(
				JSON.stringify({
					videos: videos,
				}),
				{ status: 200 }
			);
		} else {
			return new Response(
				JSON.stringify({
					error: "invalid user",
				}),
				{ status: 401 }
			);
		}
	} catch (err) {
		return new Response(
			JSON.stringify({
				error: "internal server error",
			}),
			{ status: 500 }
		);
	}
};
