import { writeFile } from "fs/promises";

const videopath = "./videos/";

export const POST = async ({ request }) => {
	const formData = await request.formData();

	var formfile = formData.get("file");
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

	return new Response(file.name, {
		status: 200,
	});
};
