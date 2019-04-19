const express = require('express');

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/company');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const companyCtrl = require('./company.controller');
const authCtrl = require('../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/companys - Get list of companys */
  .get(authCtrl.authen, companyCtrl.get)

  /** POST /api/companys - Create new company */
  .post(upload.single('avatar'), companyCtrl.create);


module.exports = router;
