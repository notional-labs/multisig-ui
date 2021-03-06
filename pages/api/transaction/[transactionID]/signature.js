import { createSignature } from "../../../../libs/faunaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const {transactionID} = req.query;
                const data = req.body
                const saveRes = await createSignature(data, transactionID);
                res.status(200).send(saveRes.data.data.createSignature);
            } catch (err) {
                console.log(err.message)
                res.status(400).send(err.message);
            }
    }
    // no route matched
    res.status(405).end();
}
