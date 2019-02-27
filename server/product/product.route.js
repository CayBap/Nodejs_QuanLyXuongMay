const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const productCtrl = require('./product.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/products - Get list of products */
  .get(authCtrl.authen, productCtrl.list)

  /** POST /api/products - Create new product */
  .post(authCtrl.authen, productCtrl.create);

router.route('/:productId')
  /** GET /api/products/:productId - Get product */
  .get(authCtrl.authen, productCtrl.get)

  /** PUT /api/products/:productId - Update product */
  .put(authCtrl.authen, productCtrl.update)

  /** DELETE /api/products/:productId - Delete product */
  .delete(authCtrl.authen, productCtrl.remove);

/** Load product when API with productId route parameter is hit */
router.param('productId', productCtrl.load);

module.exports = router;
