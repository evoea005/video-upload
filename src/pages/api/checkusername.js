import { con } from "./connect";

export const GET = ({ params, request }) => {
    return new Promise((resolve, reject) => {
        const url = new URL(request.url);
        const username = url.searchParams.get("username");

        let headers = new Headers();
        headers.set("Content-Type", "application/json");

        con.connect(function (err) {
            if (err) reject(err);

            const sql = `SELECT * FROM user WHERE username = '${username}'`;

            con.query(sql, function (err, result) {
                if (err) reject(err);

                let exists = result.length > 0;
                let response = new Response(JSON.stringify({ exists: exists }), {
                    headers: headers,
                });

                resolve(response);
            });
        });
    });
};