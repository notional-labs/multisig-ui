## This is a multisig UI 

# Getting Started

Firstly, go to Faunadb (https://fauna.com/) create a database and import the schema from the schema.graphql file. 

Secondly, get the Secret key from faunadb. Create a .local.env file in the root directory and add the secret key.

Thirdly, add the host directory in the .local.env file

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Example .local.env file

```
NEXT_PUBLIC_FAUNADB_SECRET=kfsdafsda89f8ffdf-4334
NEXT_PUBLIC_HOST=http://localhost:3000/
```

