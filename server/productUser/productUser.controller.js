const ProductUser = require('./productUser.model');

/**
 * Load ProductUser and append to req.
 */
function load(req, res, next, id) {
  ProductUser.get(id)
    .then((productUser) => {
      req.productUser = productUser; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get ProductUser
 * @returns {ProductUser}
 */
function get(req, res) {
  return res.json(req.productUser);
}

/**
 * Create new ProductUser
 * @property {string} req.body.email - The email of ProductUser.
 * @property {string} req.body.phone - The phone of ProductUser.
 * @returns {ProductUser}
 */
function create(req, res, next) {
  const productUser = new ProductUser({
    name: req.body.name,
    shrortName: req.body.shrortName,
    unit: req.body.unit,
    totalPrice: req.body.totalPrice,
    timeToEnd: req.body.timeToEnd,
    productId: req.body.productId,
    amout: req.body.amout,
    createdBy: req.currentUser._id,
  });

  productUser.save()
    .then(savedProductUser => res.json(savedProductUser))
    .catch(e => next(e));
}

/**
 * Update existing ProductUser
 * @property {string} req.body.ProductUsername - The ProductUsername of ProductUser.
 * @property {string} req.body.mobileNumber - The mobileNumber of ProductUser.
 * @returns {ProductUser}
 */
function update(req, res, next) {
  const productUser = req.ProductUser;
  productUser.name = req.body.name;
  productUser.shortName = req.body.shortName;
  productUser.unit = req.body.unit;
  productUser.totalPrice = req.body.totalPrice;
  productUser.timeToEnd = req.body.timeToEnd;
  productUser.productId = req.body.productId;
  productUser.amout = req.body.amout;
  productUser.save()
    .then(savedProductUser => res.json(savedProductUser))
    .catch(e => next(e));
}

/**
 * Get ProductUser list.
 * @property {number} req.query.skip - Number of ProductUsers to be skipped.
 * @property {number} req.query.limit - Limit number of ProductUsers to be returned.
 * @returns {ProductUser[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  ProductUser.list({ limit, skip })
    .then(ProductUsers => res.json(ProductUsers))
    .catch(e => next(e));
}

/**
 * Delete ProductUser.
 * @returns {ProductUser}
 */
function remove(req, res, next) {
  const productUser = req.ProductUser;
  productUser.remove()
    .then(deletedProductUser => res.json(deletedProductUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
