const ExportProduct = require('./exportProduct.model');
const Product = require('../product/product.model');
const Company = require('../company/company.model');

/**
 * Load ExportProduct and append to req.
 */
function load(req, res, next, id) {
  ExportProduct.get(id)
    .then((exportProduct) => {
      req.exportProduct = exportProduct; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get ExportProduct
 * @returns {ExportProduct}
 */
function get(req, res) {
  return res.json(req.exportProduct);
}

/**
 * Create new ExportProduct
 * @property {string} req.body.email - The email of ExportProduct.
 * @property {string} req.body.phone - The phone of ExportProduct.
 * @returns {ExportProduct}
 */
async function create(req, res, next) {
  const { totalPrice,
    amount,
    customer,
    products, } = req.body;
  await products.map(async (item) => {
    const product = await Product.findById(item.productId);
    product.inventory -= item.amount;
    return product.save();
  });
  const exportProduct = new ExportProduct({
    totalPrice,
    amount,
    products,
    customer,
    createdBy: req.currentUser._id,
  });
  exportProduct.save()
    .then(async (savedExportProduct) => {
      const company = await Company.findOne();
      res.json({
        exportProduct: savedExportProduct,
        company,
      });
    })
    .catch(e => next(e));
}

/**
 * Update existing ExportProduct
 * @property {string} req.body.ExportProductname - The ExportProductname of ExportProduct.
 * @property {string} req.body.mobileNumber - The mobileNumber of ExportProduct.
 * @returns {ExportProduct}
 */
function update(req, res, next) {
  const exportProduct = req.exportProduct;
  exportProduct.name = req.body.name;
  exportProduct.totalPrice = req.body.totalPrice;
  exportProduct.timeToEnd = req.body.timeToEnd;
  exportProduct.productId = req.body.productId;
  exportProduct.amount = req.body.amount;
  exportProduct.save()
    .then(savedExportProduct => res.json(savedExportProduct))
    .catch(e => next(e));
}

/**
 * Get ExportProduct list.
 * @property {number} req.query.skip - Number of ExportProducts to be skipped.
 * @property {number} req.query.limit - Limit number of ExportProducts to be returned.
 * @returns {ExportProduct[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  ExportProduct.list({ limit, skip })
    .then(ExportProducts => res.json(ExportProducts))
    .catch(e => next(e));
}

/**
 * Delete ExportProduct.
 * @returns {ExportProduct}
 */
function remove(req, res, next) {
  const exportProduct = req.exportProduct;
  exportProduct.isDeleted = true;
  exportProduct.save()
    .then(deletedExportProduct => res.json(deletedExportProduct))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
