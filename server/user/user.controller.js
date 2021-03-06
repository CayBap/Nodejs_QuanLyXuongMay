const User = require('./user.model');
const ProductUser = require('../productUser/productUser.model');
const Company = require('../company/company.model');
const Log = require('../log/log.model');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.phone - The phone of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    phone: req.body.phone,
    email: req.body.email,
    // avatar: req.body.avatar,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    dob: req.body.dob,
    companies: req.body.companies,
    role: req.body.role,
    password: req.body.password,
    roleId: req.body.roleId || undefined,
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.lastName = req.body.lastName;
  user.firstName = req.body.firstName;
  user.dob = req.body.dob;
  user.companies = req.body.companies;
  if (req.body.role) {
    user.role = req.body.role;
  }
  if (req.body.roleId) {
    user.roleId = req.body.roleId;
  }


  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;
  User.list({
    limit,
    skip
  })
    .then(users => res.json(users))
    .catch(e => next(e));
}
/**
 * Lấy bảng lương.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function listUserDash(req, res, next) {
  const {
    // limit = 50, skip = 0,
    from, to,
  } = req.query;
  User.find({
    role: 'staff'
  })
    .then((users) => {
      let newUsers = [];
      newUsers = users.map(async (user) => {
        const query = from === undefined || to === undefined ? { userId: user._id } : { userId: user._id, createdAt: { $gte: new Date(from), $lt: new Date(to) } };
        const productUser = await ProductUser.find(query).populate('productId');
        const log = await Log.find({ userId: user._id }).populate('userId').populate('createdBy');
        return {
          user,
          productUser,
          log,
        };
      });
      Promise.all(newUsers).then((reusult) => {
        const newResult = reusult;
        res.json(newResult);
      });
    })
    .catch(e => next(e));
}

function getProfile(req, res) {
  // console.log(req.currentUser);
  res.json(req.currentUser);
}

function updateProfile(req, res) {
  // res.json(req.currentUser);
  const { _id } = req.currentUser;
  User.findById(_id).then((user) => {
    if (req.file) {
      user.avatar = req.file.filename;
    }
    user.lastName = req.body.lastName;
    user.firstName = req.body.firstName;
    user.dob = req.body.dob;
    user.adress = req.body.adress;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.gender = req.body.gender;

    user.save().then((reusult) => {
      res.json(reusult);
    });
  });
}
/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}
function exportBoard(req, res) {
  const { from, to } = req.query;
  ProductUser.find({ userId: req.params.userId, createdAt: { $gte: new Date(from), $lt: new Date(to) } }).populate('productId').then((result) => {
    // res.json(result);
    User.findById(req.params.userId).then((user) => {
      Company.findOne().then((company) => {
        res.json({
          user,
          products: result,
          company,
        });
      });
    });
  }).catch((err) => {
    res.json(err);
  });
}
function addLog(req, res, next) {
  const { userId, salary, } = req.body;
  const log = new Log({
    createdBy: req.currentUser._id,
    userId,
    salary,
  });
  log.save().then((result) => {
    res.json(result);
  }).catch(err => next(err));
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
  listUserDash,
  getProfile,
  updateProfile,
  exportBoard,
  addLog,
};
