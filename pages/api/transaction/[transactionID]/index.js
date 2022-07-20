import { getTransaction } from "../../../../libs/faunaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const {transactionID} = req.query;
                const saveRes = await getTransaction(transactionID);
                res.status(200).send(saveRes.data.data.findTransactionByID);
            } catch (err) {
                console.log(err.message)
                res.status(400).send(err.message);
            }
    }
    // no route matched
    res.status(405).end();
}
