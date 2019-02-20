const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const cateCtrl = require('./cate.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/cates - Get list of cates */
  .get(authCtrl.authen, cateCtrl.list)

  /** POST /api/cates - Create new cate */
  .post(authCtrl.authen, cateCtrl.create);

router.route('/:cateId')
  /** GET /api/cates/:cateId - Get cate */
  .get(authCtrl.authen, cateCtrl.get)

  /** PUT /api/cates/:cateId - Update cate */
  .put(authCtrl.authen, cateCtrl.update)

  /** DELETE /api/cates/:cateId - Delete cate */
  .delete(authCtrl.authen, cateCtrl.remove);

/** Load cate when API with cateId route parameter is hit */
router.param('cateId', cateCtrl.load);

module.exports = router;
