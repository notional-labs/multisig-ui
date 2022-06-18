import axios from "axios";

const graphqlReq = axios.create({
    baseURL: "https://graphql.fauna.com/graphql",
    headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
    },
});

export const createMultisig = async (multisig) => {
    let multisigByAddressMutation = ''

    multisig.components.map((address, index) => {
        const mutation =
            `alias${index}: createMultisigByAddress(
                data: { address: "${multisig.address}", createFrom: "${address}" }
            ) {
                address
            }`
            multisigByAddressMutation = multisigByAddressMutation + mutation + '\n'
    })

    const res = await graphqlReq({
        method: "POST",
        data: {
            query: `
            mutation {
              createMultisig(data: {
                address: "${multisig.address}"
                pubkeyJSON: ${JSON.stringify(multisig.pubkeyJSON)}
              }) {
                _id
                address
              }

              ${multisigByAddressMutation}
            }
          `,
        },
    });

    return res
}

export const getMultisigByAddress = async (address) => {
    const res = await graphqlReq({
        method: "POST",
        data: {
            query: `
            query {
                getMultisig(address: "${address.address}") {
                  address
                  pubkeyJSON
                }
              }
          `
        },
    })
    return res
}