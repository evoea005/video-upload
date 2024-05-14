import { con } from "./connect";

export const POST = async ({ request }) => {
	try {
		const { session } = await request.json();

		const sql = `SELECT * FROM user WHERE session = ?`;

		const [result] = await con.promise().query(sql, [session]);

		if (result.length > 0) {
			return new Response(
				JSON.stringify({
					success: "session valid",
					username: result[0].username,
				}),
				{ status: 200 }
			);
		} else {
			return new Response(
				JSON.stringify({
					error: "invalid session",
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
