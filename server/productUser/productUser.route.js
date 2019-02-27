const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const productUserCtrl = require('./productUser.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/productUsers - Get list of productUsers */
  .get(authCtrl.authen, productUserCtrl.list)

  /** POST /api/productUsers - Create new productUser */
  .post(authCtrl.authen, productUserCtrl.create);

router.route('/:productUserId')
  /** GET /api/productUsers/:productUserId - Get productUser */
  .get(authCtrl.authen, productUserCtrl.get)

  /** PUT /api/productUsers/:productUserId - Update productUser */
  .put(authCtrl.authen, productUserCtrl.update)

  /** PUT /api/productUsers/:productUserId - Update productUser */
  .patch(authCtrl.authen, productUserCtrl.updateStatus)

  /** DELETE /api/productUsers/:productUserId - Delete productUser */
  .delete(authCtrl.authen, productUserCtrl.remove);

router.get('/user/:userId', authCtrl.authen, productUserCtrl.listByUser);

/** Load productUser when API with productUserId route parameter is hit */
router.param('productUserId', productUserCtrl.load);

module.exports = router;
