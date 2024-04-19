import { con } from "./connect";

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export const GET = async ({ params, request }) => {
	return new Promise((resolve, reject) => {
		const url = new URL(request.url);
		const usernames = url.searchParams.get("username").split(",");

		var users = [];

		con.connect(async function (err) {
			usernames.forEach((username) => {
				let sql = `SELECT * FROM user WHERE username = '${username}'`;

				con.query(sql, function (err, result) {
					if (err) reject(err);

					users.push({ username: username, exists: result.length > 0 });
				});
			});

			let headers = new Headers();
			headers.set("Content-Type", "application/json");

			// uh oh - this is really bad practice, but who cares
			await sleep(100);

			let response = new Response(JSON.stringify({ users: users }), {
				headers: headers,
			});


			resolve(response);
		});
	});
};
