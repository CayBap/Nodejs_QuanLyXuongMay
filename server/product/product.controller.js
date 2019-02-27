const Product = require('./product.model');

/**
 * Load Product and append to req.
 */
function load(req, res, next, id) {
  Product.get(id)
    .then((product) => {
      req.product = product; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Product
 * @returns {Product}
 */
function get(req, res) {
  return res.json(req.product);
}

/**
 * Create new Product
 * @property {string} req.body.email - The email of Product.
 * @property {string} req.body.phone - The phone of Product.
 * @returns {Product}
 */
function create(req, res, next) {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    priceForEmploy: req.body.priceForEmploy,
    amount: req.body.amount,
    inventory: req.body.amount,
    quantitySold: req.body.quantitySold,
    cate: req.body.cate,
    size: req.body.size,
    color: req.body.color,
    mainImage: req.body.subImage ? req.body.subImage[0] : undefined,
    subImage: req.body.subImage,
    shortName: req.body.shortName,
    description: req.body.description,
    createdBy: req.currentUser._id,
  });
  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch((e) => {
      console.log(e);
      next(e);
    });
}

/**
 * Update existing Product
 * @property {string} req.body.Productname - The Productname of Product.
 * @property {string} req.body.mobileNumber - The mobileNumber of Product.
 * @returns {Product}
 */
function update(req, res, next) {
  const product = req.product;
  product.name = req.body.name;
  product.price = req.body.price;
  product.priceForEmploy = req.body.priceForEmploy;
  product.amount = req.body.amount;
  // product.inventory = req.body.inventory;
  // product.quantitySold = req.body.quantitySold;
  product.cate = req.body.cate;
  product.size = req.body.size;
  product.color = req.body.color;
  product.mainImage = req.body.subImage ? req.body.subImage[0] : undefined;
  product.subImage = req.body.subImage;
  product.shortName = req.body.shortName;
  product.description = req.body.description;
  product.save()
    .then(savedProduct => res.json(savedProduct))
    .catch(e => next(e));
}

/**
 * Get Product list.
 * @property {number} req.query.skip - Number of Products to be skipped.
 * @property {number} req.query.limit - Limit number of Products to be returned.
 * @returns {Product[]}
 */
function list(req, res, next) {
  const { limit = 1000, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then(Products => res.json(Products))
    .catch(e => next(e));
}

/**
 * Delete Product.
 * @returns {Product}
 */
function remove(req, res, next) {
  const product = req.product;
  product.isDeleted = true;
  product.save()
    .then(deletedProduct => res.json(deletedProduct))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
