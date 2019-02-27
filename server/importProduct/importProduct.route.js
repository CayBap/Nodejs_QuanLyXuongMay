const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const importProductCtrl = require('./importProduct.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/importProducts - Get list of importProducts */
  .get(authCtrl.authen, importProductCtrl.list)

  /** POST /api/importProducts - Create new importProduct */
  .post(authCtrl.authen, importProductCtrl.create);

router.route('/:importProductId')
  /** GET /api/importProducts/:importProductId - Get importProduct */
  .get(authCtrl.authen, importProductCtrl.get)

  /** PUT /api/importProducts/:importProductId - Update importProduct */
  .put(authCtrl.authen, importProductCtrl.update)

  /** DELETE /api/importProducts/:importProductId - Delete importProduct */
  .delete(authCtrl.authen, importProductCtrl.remove);

/** Load importProduct when API with importProductId route parameter is hit */
router.param('importProductId', importProductCtrl.load);

module.exports = router;
