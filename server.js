const path = require('path');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync( './**/*', { extensions: ['graphql'] });
const resolversArray = loadFilesSync('./**/*', { extensions: ['resolvers.js'] });

async function startApolloServer() {
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray,
    });

    const server = new ApolloServer({})
}

app.use('/graphql', () => {});

app.listen(3000, () => {
    console.log(`listening on port 3000`);
    console.log(`Running GraphgQL server...`);
});