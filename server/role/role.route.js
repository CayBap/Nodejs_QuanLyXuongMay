const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const roleCtrl = require('./role.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/cates - Get list of cates */
  .get(authCtrl.authen, roleCtrl.list)

  /** POST /api/cates - Create new role */
  .post(authCtrl.authen, roleCtrl.create);

router.route('/:cateId')
  /** GET /api/cates/:cateId - Get role */
  .get(authCtrl.authen, roleCtrl.get)

  /** PUT /api/cates/:cateId - Update role */
  .put(authCtrl.authen, roleCtrl.update)

  /** DELETE /api/cates/:cateId - Delete role */
  .delete(authCtrl.authen, roleCtrl.remove);

/** Load role when API with cateId route parameter is hit */
router.param('cateId', roleCtrl.load);

module.exports = router;
