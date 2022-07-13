import { getTransactionsOfMultisig } from "../../../../libs/faunaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const {multisigID} = req.query
                const saveRes = await getTransactionsOfMultisig(multisigID);
                res.status(200).send(saveRes.data.data.getTxByMultisig.data);
            } catch (err) {
                console.log(err.message)
                res.status(400).send(err.message);
            }
    }
    // no route matched
    res.status(405).end();
}