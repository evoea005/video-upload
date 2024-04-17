import { con } from "./connect";

async function sha256(input) {
	const inputbuffer = new TextEncoder().encode(input);
	const hashbuffer = await crypto.subtle.digest("SHA-256", inputbuffer);

	const hasharray = Array.from(new Uint8Array(hashbuffer));

	const hash = hasharray.map((byte) => ("00" + byte.toString(16)).slice(-2)).join("");

	return hash;
}

export const POST = async ({ request }) => {
	const { username, password } = await request.json();

	const passwordhash = await sha256(password);

	con.connect(function (err) {
		if (err) throw err;
		const sql = `INSERT INTO user (username, password) VALUES ('${username}', '${passwordhash}')`;
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log(`user registered with id: ${result.insertId} and username: ${username}`);
		});
	});
	return new Response({ status: 200, body: { success: true } });
};
