const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const productRoutes = require('./server/product/product.route');
const companyRoutes = require('./server/company/company.route');
const cateRoutes = require('./server/cate/cate.route');
const importProductRoutes = require('./server/importProduct/importProduct.route');
const exportProductRoutes = require('./server/exportProduct/exportProduct.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

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

module.exports = router;
