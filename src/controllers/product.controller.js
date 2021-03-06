const { Product } = require("../model/Product.model");
const httpStatus = require("http-status");
const { sendResponse } = require("../utils/response");

exports.getAll = async (req, res, next) => {
  try {
    const instances = await Product.find();
    res.json(sendResponse(instances, httpStatus.OK, null));
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instance = await Product.findById(id);
    if (!instance) {
      return res.json(
        sendResponse("This product does not exist", httpStatus.OK, null)
      );
    }
    return res.json(sendResponse(instance, httpStatus.OK, null));
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    // const image = req.file.location;
    const { name, description, price, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      // category,
      image
      // color
    });
    await product.save();

    res.json(sendResponse(product, httpStatus.OK, null));
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);

    let {
      name = product.name,
      description = product.description,
      price = product.price,
      image = product.image
    } = req.body;

    const newProduct = {
      ...product.toObject(),
      name: name,
      description: description,
      price: price,
      image: image
    };

    product = await Product.findByIdAndUpdate({ _id: id }, newProduct, {
      new: true
    });

    res.json(sendResponse(product, httpStatus.OK, null));
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const instance = await Product.findByIdAndDelete(id);
    if (!instance) {
      return res.json(
        sendResponse("This product does not exist", httpStatus.OK, null)
      );
    }
    return res.json(sendResponse(instance, httpStatus.OK, null));
  } catch (error) {
    next(error);
  }
};
