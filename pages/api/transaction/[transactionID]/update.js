import { updateTransaction } from "../../../../libs/faunaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const {transactionID} = req.query;
                const { txHash, multisigID } = req.body;
                const saveRes = await updateTransaction(txHash, transactionID, multisigID);
                console.log(saveRes.data)
                res.status(200).send(saveRes.data.data.updateTransaction);
            } catch (err) {
                console.log(err.message)
                res.status(400).send(err.message);
            }
    }
    // no route matched
    res.status(405).end();
}
