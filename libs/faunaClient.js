import faunadb, { Ref } from "faunadb";

const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET
})

const getAllMultisig = async (address) => {
    try {
        const res = await faunaClient.query(
            Ref('transaction')
        )
    }
    catch (e){
        
    }
}