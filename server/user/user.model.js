const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const bcrypt = require('bcryptjs');
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    match: [/(09|01||02||03||04||05||06||07||08)+([0-9]{8})/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.'],
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  avatar: String,
  lastName: {
    type: String,
    required: true,
    maxlength: 30,
  },
  firstName: {
    type: String,
    maxlength: 100,
    required: true,
  },
  // is timestamp value this.birthDate/1000
  dob: {
    type: String,
    required: true,
  },
  adress: String,
  gender: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // staff, admin, superAdmin
  role: {
    type: String,
    default: 'staff',
  },
  // facebook,phone,google login
  facebook: {},
  google: {},
}, {
  timestamps: true
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
/* eslint func-names: ["error", "never"]*/
UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});
UserSchema.methods = {
  comparePassword(toCompare) {
    return bcrypt.compareSync(toCompare, this.password);
  }
};

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * Get user by phone
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  getUserByPhone(phone) {
    return this.findOne({ phone })
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
