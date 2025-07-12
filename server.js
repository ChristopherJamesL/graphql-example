const path = require('path');
const express = require('express');
const { createYoga } = require('graphql-yoga');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync( './**/*.graphql', { extensions: ['graphql'], });

const products = require('./products/products.model');
const orders = require('./orders/orders.model');

const resolvers = {
    Query: {
        products: async () => {
            console.log('Getting products...');
            const product = await Promise.resolve(products);
            return product;
        },
        orders: () => {
            console.log('Getting orders...');
            return orders;
        },
    },
};

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers,
});




const app = express();

app.use('/graphql', createYoga({
    schema,
    graphiql:  true,
}));

app.listen(3000, () => {
    console.log(`listening on port 3000`);
    console.log(`Running GraphgQL server...`);
});