const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// adding a new product
exports.addProduct = catchAsyncError(async (req, res, next) => {
  const existingProduct = await Product.findOne({ name: req.body.name });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product already added!",
    });
  }

  const product = await Product.create(req.body);
  await product.save();
  return res.status(201).json({
    success: true,
    message: "Product added Successfully",
    product,
  });
});

// fetching all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const productPerPage = 5;

    let productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productPerPage);
  const products = await apiFeature.query;
  if (!products) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  return res.status(200).json({
    success: true,
    products,
    productCount
  });
});

// updating a product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  await Product.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).json({
    success: true,
    message: "Product updated successfully!",
  });
});

// deleting a product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  await Product.findByIdAndRemove(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Product removed successfully!",
  });
});

// fetching a product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});
