const path = require('path');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
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
    
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false }),]
    });
    
    await server.start();
    
    app.use(cors());
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => ({}),
    }));

    app.listen(3000, () => {
        console.log(`listening on port 3000`);
        console.log(`Running GraphgQL server...`);
    });
}

startApolloServer();
