const ImportProduct = require('./importProduct.model');

/**
 * Load ImportProduct and append to req.
 */
function load(req, res, next, id) {
  ImportProduct.get(id)
    .then((importProduct) => {
      req.importProduct = importProduct; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get ImportProduct
 * @returns {ImportProduct}
 */
function get(req, res) {
  return res.json(req.importProduct);
}

/**
 * Create new ImportProduct
 * @property {string} req.body.email - The email of ImportProduct.
 * @property {string} req.body.phone - The phone of ImportProduct.
 * @returns {ImportProduct}
 */
function create(req, res, next) {
  const importProduct = new ImportProduct({
    name: req.body.name,
    shrortName: req.body.shrortName,
    unit: req.body.unit,
    totalPrice: req.body.totalPrice,
    timeToEnd: req.body.timeToEnd,
    amout: req.body.amout,
    createdBy: req.currentUser._id,
  });

  importProduct.save()
    .then(savedImportProduct => res.json(savedImportProduct))
    .catch(e => next(e));
}

/**
 * Update existing ImportProduct
 * @property {string} req.body.ImportProductname - The ImportProductname of ImportProduct.
 * @property {string} req.body.mobileNumber - The mobileNumber of ImportProduct.
 * @returns {ImportProduct}
 */
function update(req, res, next) {
  const importProduct = req.ImportProduct;
  importProduct.name = req.body.name;
  importProduct.shortName = req.body.shortName;
  importProduct.unit = req.body.unit;
  importProduct.totalPrice = req.body.totalPrice;
  importProduct.timeToEnd = req.body.timeToEnd;
  importProduct.amout = req.body.amout;
  importProduct.save()
    .then(savedImportProduct => res.json(savedImportProduct))
    .catch(e => next(e));
}

/**
 * Get ImportProduct list.
 * @property {number} req.query.skip - Number of ImportProducts to be skipped.
 * @property {number} req.query.limit - Limit number of ImportProducts to be returned.
 * @returns {ImportProduct[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  ImportProduct.list({ limit, skip })
    .then(ImportProducts => res.json(ImportProducts))
    .catch(e => next(e));
}

/**
 * Delete ImportProduct.
 * @returns {ImportProduct}
 */
function remove(req, res, next) {
  const importProduct = req.ImportProduct;
  importProduct.remove()
    .then(deletedImportProduct => res.json(deletedImportProduct))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
