const { Joi } = require("celebrate");

module.exports = {
  // POST /api/products
  createProduct: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.string().required(),
      category: Joi.string().required(),
      color: Joi.string().required()
    }
  },
  // UPDATE /api/products/:id
  updateProduct: {
    body: {
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.string(),
      category: Joi.string(),
      color: Joi.string()
    },
    params: {
      id: Joi.string()
        .hex()
        .required()
    }
  },
  // GET /api/products/:id
  getProduct: {
    params: {
      id: Joi.string()
        .hex()
        .required()
    }
  }
};
