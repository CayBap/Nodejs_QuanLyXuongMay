const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const exportProductCtrl = require('./exportProduct.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/exportProducts - Get list of exportProducts */
  .get(authCtrl.authen, exportProductCtrl.list)

  /** POST /api/exportProducts - Create new exportProduct */
  .post(authCtrl.authen, exportProductCtrl.create);

router.route('/:exportProductId')
  /** GET /api/exportProducts/:exportProductId - Get exportProduct */
  .get(authCtrl.authen, exportProductCtrl.get)

  /** PUT /api/exportProducts/:exportProductId - Update exportProduct */
  .put(authCtrl.authen, exportProductCtrl.update)

  /** DELETE /api/exportProducts/:exportProductId - Delete exportProduct */
  .delete(authCtrl.authen, exportProductCtrl.remove);

/** Load exportProduct when API with exportProductId route parameter is hit */
router.param('exportProductId', exportProductCtrl.load);

module.exports = router;
