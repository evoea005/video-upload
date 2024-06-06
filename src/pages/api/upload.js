import { writeFile } from "fs/promises";
import { mkdirSync, existsSync } from "fs";
import { con } from "./connect";
import crypto from "crypto";


export const POST = async ({ request }) => {
	var videopath = "./public/videos/";

	const formData = await request.formData();

	var formfile = formData.get("file");
	var session = formData.get("session");

	// check if session is valid
	const sql = `SELECT * FROM user WHERE session = ?`;

	const [result] = await con.promise().query(sql, [session]);

	if (result.length == 0) {
		return new Response(null, {
			status: 401,
		});
	}

	videopath += result[0].id + "/";

	// if folder does not exist, create it
	if (!existsSync(videopath)) {
		try {
			mkdirSync(videopath, { recursive: true });
		} catch (err) {}
	}

	var file = {
		webkitRelativePath: formfile.webkitRelativePath,
		lastModified: formfile.lastModified,
		name: formfile.name,
		size: formfile.size,
		type: formfile.type,
		buffer: {
			type: "Buffer",
			value: Array.from(new Int8Array(await formfile.arrayBuffer()).values()),
		},
	};

	// if filesize > 1gb
	if (file.size > 1 * 1073741824) {
		return new Response(null, {
			status: 413,
		});
	}

	// save file
	await writeFile(videopath + file.name, Buffer.from(file.buffer.value));

	// save to database
	const sql2 = `INSERT INTO videos (userid, video) VALUES (?, ?)`;

	await con.promise().query(sql2, [result[0].id, file.name]);

	return new Response(file.name, {
		status: 200,
	});
};
