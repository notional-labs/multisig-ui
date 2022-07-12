import axios from "axios";
const faunadb = require('faunadb')

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
})

const q = faunadb.query

const graphqlReq = axios.create({
  baseURL: "https://graphql.fauna.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
  },
});

export const deletePreviousSig = async (address) => {
  // delete all previous signature when new tx is broadcast
  const helper = await client.paginate(
    q.Match(
      q.Index('getSignaturesFromAddress'),
      address
    ),
  ).each(function (signatures) {
    signatures.map(async (signature) => {
      await client.query(
        q.Delete(
          q.Ref(signature)
        )
      )
    })
  })
}

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

  const date = new Date()

  const res = await graphqlReq({
    method: "POST",
    data: {
      query: `
            mutation {
              createMultisig(data: {
                address: "${multisig.address}",
                pubkeyJSON: ${JSON.stringify(multisig.pubkeyJSON)},
                prefix: "${multisig.prefix}"
                createdOn: "${date.toISOString()}"
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
                  prefix
                  createdOn
                }
              }
          `
    },
  })
  return res
}

export const getMultisigOfAddress = async (address) => {
  const res = await graphqlReq({
    method: "POST",
    data: {
      query: `
            query{
                getAllMultisigByAddress(
                    createFrom: "${address.address}"
                ) {
                    data {
                      address
                    }
                }
            }
          `
    },
  })
  return res
}

export const createTransaction = async (transaction) => {
  const date = new Date()

  const res = await graphqlReq({
    method: "POST",
    data: {
      query: `
            mutation {
              createTransaction(data: {
                createBy: "${transaction.createBy}",
                dataJSON: ${JSON.stringify(transaction.dataJSON)},
                status: "PENDING"
                createdOn: "${date.toISOString()}"
              }) {
                _id
              }
            }
          `,
    },
  })
  return res
}

export const getTransaction = async (id) => {
  const res = await graphqlReq({
    method: "POST",
    data: {
      query: `
                query {
                    findTransactionByID(id: "${id}") {
                    _id
                    createBy
                    txHash
                    signatures {
                      data {
                        _id
                        address
                        signature
                        bodyBytes
                        accountNumber
                        sequence
                      }
                    }
                    dataJSON
                  }
                }
          `,
    },
  })
  return res
}

export const getTransactionByStatus = async (address) => {
  return graphqlReq({
    method: "POST",
    data: {
      query: `
        mutation {
          createSignature(data: {
            transaction: {connect: ${transactionId}}, 
            bodyBytes: "${signature.bodyBytes}",
            signature: "${signature.signature}",
            address: "${signature.address}" 
          }) {
            _id
            address
            signature
            address
          }
        }
      `,
    },
  });
}

export const createSignature = async (signature, transactionId) => {
  return graphqlReq({
    method: "POST",
    data: {
      query: `
        mutation {
          createSignature(data: {
            transaction: {connect: ${transactionId}}, 
            bodyBytes: "${signature.bodyBytes}",
            signature: "${signature.signature}",
            address: "${signature.address}",
            accountNumber: ${signature.accountNumber},
            sequence: ${signature.sequence}
          }) {
            _id
            address
            signature
            address
            accountNumber
            sequence
          }
        }
      `,
    },
  });
};

export const updateSignature = async (signature, transactionId) => {
  return graphqlReq({
    method: "POST",
    data: {
      query: `
        mutation {
          updateSignature(id: "${signature.id}",
             data: { 
              transaction: {connect: ${transactionId}}, 
              bodyBytes: "${signature.bodyBytes}",
              signature: "${signature.signature}",
              address: "${signature.address}",
              accountNumber: ${signature.accountNumber},
              sequence: ${signature.sequence}
            }) {
              _id
              address
              signature
              address
              accountNumber
              sequence
            }
        }
      `,
    },
  });
};

export const deleteSignature = async (id) => {
  console.log(id)
  return graphqlReq({
    method: "POST",
    data: {
      query: `
        mutation {
          deleteSignature(id: "${id}") {
              _id
            }
        }
      `,
    },
  });
}

export const updateTransaction = async (txHash, transactionID, multisigID) => {
  return graphqlReq({
    method: "POST",
    data: {
      query: `
        mutation {
          updateTransaction(id: ${transactionID}, 
            data: {
              txHash: "${txHash}",
              status: "FINISHED",
              createBy: "${multisigID}"
            }) {
            _id
            dataJSON
            txHash
            signatures {
              data {
                _id
                address
                signature
                bodyBytes
                accountNumber
                sequence
              }
            }
          }
        }
      `,
    },
  });
}

export const getTransactionsOfMultisig = async (multisig) => {
  const res = await graphqlReq({
    method: "POST",
    data: {
      query: `
        query {
          getTxByMultisig(createBy: "${multisig}"){
            data{
              _id
              createdOn
              dataJSON
              status
              txHash
            }
          }
        }
      `,
    },
  })
  return res
}