const express = require('express');
const { addProduct, deleteProduct, getAllProducts, updateProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');
const productRouter = express.Router();

// adding a new product 
productRouter.route('/addproduct').post(addProduct)
// fetching all products 
productRouter.route('/products').get(isAuthenticatedUser, getAllProducts)
// updating a product 
productRouter.route('/product/:id').put(updateProduct)
//deleting a product
productRouter.route('/product/:id').delete(deleteProduct)
// fetching a product details 
productRouter.route('/product/:id').get(getProductDetails)

module.exports = productRouter