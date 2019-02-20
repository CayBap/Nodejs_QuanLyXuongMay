const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const companyCtrl = require('./company.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/companys - Get list of companys */
  .get(authCtrl.authen, companyCtrl.list)

  /** POST /api/companys - Create new company */
  .post(companyCtrl.create);

router.route('/:companyId')
  /** GET /api/companys/:companyId - Get company */
  .get(authCtrl.authen, companyCtrl.get)

  /** PUT /api/companys/:companyId - Update company */
  .put(authCtrl.authen, companyCtrl.update)

  /** DELETE /api/companys/:companyId - Delete company */
  .delete(authCtrl.authen, companyCtrl.remove);

/** Load company when API with companyId route parameter is hit */
router.param('companyId', companyCtrl.load);

module.exports = router;
