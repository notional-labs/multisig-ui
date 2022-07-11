import { createSignature, deletePreviousSig } from "../../../../libs/faunaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const {transactionID} = req.query;
                const data = req.body
                await deletePreviousSig(data.address)
                const saveRes = await createSignature(data, transactionID);
                console.log(saveRes.data)
                res.status(200).send(saveRes.data.createSignature);
            } catch (err) {
                console.log(err.message)
                res.status(400).send(err.message);
            }
    }
    // no route matched
    res.status(405).end();
}
