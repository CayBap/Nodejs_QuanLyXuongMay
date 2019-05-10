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
    nameForUser: req.body.nameForUser,
    productName: req.body.productName,
    userId: req.body.userId,
    productId: req.body.productId,
    amount: req.body.amount,
    color: req.body.color,
    size: req.body.size,
    timeToEnd: req.body.timeToEnd,
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
  const productUser = req.productUser;
  productUser.nameForUser = req.body.nameForUser;
  productUser.productName = req.body.productName;
  productUser.userId = req.body.userId;
  productUser.productId = req.body.productId;
  productUser.color = req.body.color;
  productUser.size = req.body.size;
  productUser.timeToEnd = req.body.timeToEnd;
  productUser.productId = req.body.productId;
  productUser.amount = req.body.amount;
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
function updateStatus(req, res, next) {
  const productUser = req.productUser;
  productUser.finished = !productUser.finished;
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

function listByUser(req, res, next) {
  const { from, to } = req.query;
  const query = from === undefined || to === undefined ? { userId: req.params.userId } : { userId: req.params.userId, createdAt: { $gte: new Date(from), $lt: new Date(to) } };
  ProductUser.find(query).populate('productId').then((result) => {
    res.json(result);
  }).catch((err) => {
    next(err);
  });
}
/**
 * Delete ProductUser.
 * @returns {ProductUser}
 */
function remove(req, res, next) {
  const productUser = req.productUser;
  productUser.isDeleted = true;
  productUser.save()
    .then(deletedProductUser => res.json(deletedProductUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove, updateStatus, listByUser };
