const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');
const authCtrl = require('./../auth/auth.controller');

const router = express.Router(); // eslint-disable-line new-cap
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

router.route('/')
  /** GET /api/users - Get list of users */
 .get(authCtrl.authen, userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.get('/boardEmploy', userCtrl.listUserDash);
router.route('/profile').get(authCtrl.authen, userCtrl.getProfile).put(upload.single('avatar'), authCtrl.authen, userCtrl.updateProfile);
router.get('/export/:userId', authCtrl.authen, userCtrl.exportBoard);
router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(authCtrl.authen, userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(authCtrl.authen, validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(authCtrl.authen, userCtrl.remove);
router.post('/addLog', authCtrl.authen, userCtrl.addLog);


/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
