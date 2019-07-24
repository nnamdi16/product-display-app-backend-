const express = require("express");
const { celebrate: validate } = require("celebrate");
const productCtrl = require("../controllers/product.controller");
const {
  createProduct,
  updateProduct,
  getProduct
} = require("../validation/product.validation");
const upload = require("../utils/file-upload");

const router = express.Router();

router
  .route("/")
  .get(productCtrl.getAll)
  .post(
    // upload("images").single("image"),
    validate(createProduct, { abortEarly: false }),
    productCtrl.create
  );

router
  .route("/:id")
  .get(validate(getProduct, { abortEarly: false }), productCtrl.getOne)
  .put(validate(updateProduct, { abortEarly: false }), productCtrl.update)
  .delete(productCtrl.remove);

module.exports = router;
