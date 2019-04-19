const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const productRoutes = require('./server/product/product.route');
const companyRoutes = require('./server/company/company.route');
const cateRoutes = require('./server/cate/cate.route');
const importProductRoutes = require('./server/importProduct/importProduct.route');
const exportProductRoutes = require('./server/exportProduct/exportProduct.route');
const productUserRoutes = require('./server/productUser/productUser.route');
const usserRoutes = require('./server/user/user.route');
const roleRoutes = require('./server/role/role.route');


const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage
});


const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
// router.get('/health-check', (req, res) => {
// }

// );

router.post('/upload', upload.array('imageFiles', 12), (req, res) => {
  const data = req.files.map(item => `http://localhost:4040/static/${item.filename}`);
  res.status(200).json(data);
  // req.body contains the text fields
});

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount auth routes at /product
router.use('/product', productRoutes);

// mount auth routes at /company
router.use('/company', companyRoutes);

// mount auth routes at /cate
router.use('/cate', cateRoutes);

// mount auth routes at /import-product
router.use('/import-product', importProductRoutes);

// mount auth routes at /export-product
router.use('/export-product', exportProductRoutes);
// mount auth routes at /export-product
router.use('/delivery', productUserRoutes);
// mount auth routes at /delivery
router.use('/user', usserRoutes);
// mount auth routes at /role
router.use('/role', roleRoutes);


module.exports = router;
