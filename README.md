## This is a multisig UI.

# Getting Started

Firstly, go to Faunadb (https://fauna.com/) create a database and import the schema from the schema.graphql file. 

Secondly, get the Secret key from faunadb. Create a .env.local file in the root directory and add the secret key.

Thirdly, add the host directory in the .env.local file

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Example .env.local file

```
NEXT_PUBLIC_FAUNADB_SECRET=kfsdafsda89f8ffdf-4334
NEXT_PUBLIC_HOST=http://localhost:3000/
```

# Supported chains:

1. Osmosis
2. Gaia (cosmoshub)
3. Juno
4. Akash
5. Emoney
6. Sifchain
7. Stargaze
8. Kava
9. Rengen
10. Omniflix
11. Cheqd
12. Bitcanna
13. Gravity bridge
14. Pylon (testnet)

Will add more chains in the future

