import axios from "axios";
const faunadb = require('faunadb')
import { Client, fql } from 'fauna'

const client2 = new Client({
  secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET
})

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
})

const q = faunadb.query

const graphqlReq = axios.create({
  baseURL: "https://graphql.eu.fauna.com/graphql",
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
  console.log("createMultisig");
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
  const query = fql`
        Multisig.create({
          address: ${multisig.address},
          pubkeyJSON: ${JSON.stringify(multisig.pubkeyJSON)},
          prefix: ${multisig.prefix},
          createdOn: ${date.toISOString()},
        })
    `
  const res = await client2.query(query)
  console.log(res);
  return {
    data: {
      data: {
        createMultisig: res.data
      }
    }
  }
  // const res = await graphqlReq({
  //   method: "POST",
  //   data: {
  //     query: `
  //           mutation {
  //             createMultisig(data: {
  //               address: "${multisig.address}",
  //               pubkeyJSON: ${JSON.stringify(multisig.pubkeyJSON)},
  //               prefix: "${multisig.prefix}"
  //               createdOn: "${date.toISOString()}"
  //             }) {
  //               _id
  //               address
  //             }

  //             ${multisigByAddressMutation}
  //           }
  //         `,
  //   },
  // });

  // return res
}

export const getMultisigByAddress = async (address) => {
  console.log("getMultisigByAddress");
  const query = fql`
        Multisig.all().where(.address == ${address.address})
    `
  const res = await client2.query(query)
  return {
    data: {
      data: {
        getMultisig: res.data.data[0]
      }
    }
  }
  // const res = await graphqlReq({
  //   method: "POST",
  //   data: {
  //     query: `
  //           query {
  //               getMultisig(address: "${address.address}") {
  //                 address
  //                 pubkeyJSON
  //                 prefix
  //                 createdOn
  //               }
  //             }
  //         `
  //   },
  // })
  // return res
}

export const getMultisigOfAddress = async (address) => {
  console.log("getMultisigOfAddress");
  const query = fql`
        Multisig.all().where(.createFrom == ${address.address})
    `
  const res = await client2.query(query)
  console.log(res);
  return {
    data: {
      data: {
        getAllMultisigByAddress: res.data.data[0]
      }
    }
  }
  // const res = await graphqlReq({
  //   method: "POST",
  //   data: {
  //     query: `
  //           query{
  //               getAllMultisigByAddress(
  //                   createFrom: "${address.address}"
  //               ) {
  //                   data {
  //                     address
  //                   }
  //               }
  //           }
  //         `
  //   },
  // })
  // return res
}

export const createTransaction = async (transaction) => {
    const date = new Date()
  console.log("createTransaction");
  const query = fql`
    Transaction.create({
      createBy: ${transaction.createBy},
      dataJSON: ${JSON.stringify(transaction.dataJSON)},
      status: "PENDING",
      createdOn: ${date.toISOString()}
    })
  `
  const res = await client2.query(query)
  return {
    data: {
      data: {
        createTransaction: res.data
      }
    }
  }
  // const res = await graphqlReq({
  //   method: "POST",
  //   data: {
  //     query: `
  //           mutation {
  //             createTransaction(data: {
  //               createBy: "${transaction.createBy}",
  //               dataJSON: ${JSON.stringify(transaction.dataJSON)},
  //               status: "PENDING"
  //               createdOn: "${date.toISOString()}"
  //             }) {
  //               _id
  //             }
  //           }
  //         `,
  //   },
  // })
  // return res
}

export const getTransaction = async (id) => {
  const query = fql`
        Transaction.all().where(.id == ${id})
    `
  const transactionRes = await client2.query(query)
  console.log("transactionRes", transactionRes);
  const query2 = fql`
        Signature.all().where(.transaction == ${id})
    `
  const signatureRes = await client2.query(query2)
  return {
    data: {
      data: {
        findTransactionByID: transactionRes.data.data
      }
    }
  }
  // const res = await graphqlReq({
  //   method: "POST",
  //   data: {
  //     query: `
  //               query {
  //                   findTransactionByID(id: "${id}") {
  //                   _id
  //                   createBy
  //                   txHash
  //                   signatures {
  //                     data {
  //                       _id
  //                       address
  //                       signature
  //                       bodyBytes
  //                       accountNumber
  //                       sequence
  //                     }
  //                   }
  //                   dataJSON
  //                 }
  //               }
  //         `,
  //   },
  // })
  // return res
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
  const date = new Date()
  console.log("createSignature");
  const query = fql`
    Signature.create({
      transaction: ${transactionId}, 
      bodyBytes: ${signature.bodyBytes},
      signature: ${signature.signature},
      address: ${signature.address},
      accountNumber: ${signature.accountNumber},
      sequence: ${signature.sequence}
    })
  `
  const res = await client2.query(query)
  console.log(res);
  return {
    data: {
      data: {
        createSignature: res.data
      }
    }
  }
  // return graphqlReq({
  //   method: "POST",
  //   data: {
  //     query: `
  //       mutation {
  //         createSignature(data: {
  //           transaction: {connect: ${transactionId}}, 
  //           bodyBytes: "${signature.bodyBytes}",
  //           signature: "${signature.signature}",
  //           address: "${signature.address}",
  //           accountNumber: ${signature.accountNumber},
  //           sequence: ${signature.sequence}
  //         }) {
  //           _id
  //           address
  //           signature
  //           accountNumber
  //           sequence
  //           bodyBytes
  //         }
  //       }
  //     `,
  //   },
  // });
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
              bodyBytes
              accountNumber
              sequence
            }
        }
      `,
    },
  });
};

export const deleteSignature = async (id) => {
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

export const deleteTransaction = async (id) => {
  return graphqlReq({
    method: "POST",
    data: {
      query: `
        mutation {
          deleteTransaction(id: "${id}") {
              _id
            }
        }
      `,
    },
  });
}


export const getTransactionsOfMultisig = async (multisig) => {
  console.log("getTransactionsOfMultisig");
  const query = fql`
        Transaction.all().where(.createBy == ${multisig}, )
    `
  const res = await client2.query(query)
  console.log(res);
  return {
    data: {
      data: {
        getTxByMultisig: {
          data: res.data.data[0]
        }
      }
    }
  }
  // const res = await graphqlReq({
  //   method: "POST",
  //   data: {
  //     query: `
  //       query {
  //         getTxByMultisig(createBy: "${multisig}"){
  //           data{
  //             _id
  //             createdOn
  //             dataJSON
  //             status
  //             txHash
  //           }
  //         }
  //       }
  //     `,
  //   },
  // })
  // return res
}
