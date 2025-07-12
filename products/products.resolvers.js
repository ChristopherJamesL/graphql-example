const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: () => {
            console.log('Getting products...');
            return productsModel.getAllProducts();
        }
    }
};