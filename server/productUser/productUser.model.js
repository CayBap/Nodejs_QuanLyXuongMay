const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
/**
 * ProductUser Schema
 */
const ProductUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amout: {
    type: Number,
    required: true,
  },
  sizes: [{
    type: String,
  }],
  colors: [{ type: String }],
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

}, {
  timestamps: true
});


/**
 * Statics
 */
ProductUserSchema.statics = {
  /**
   * Get ProductUser
   * @param {ObjectId} id - The objectId of ProductUser.
   * @returns {Promise<ProductUser, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((productUser) => {
        if (productUser) {
          return productUser;
        }
        const err = new APIError('No such ProductUser exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List ProductUsers in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of ProductUsers to be skipped.
   * @param {number} limit - Limit number of ProductUsers to be returned.
   * @returns {Promise<ProductUser[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef ProductUser
 */
module.exports = mongoose.model('ProductUser', ProductUserSchema);
