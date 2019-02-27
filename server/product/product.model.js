const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
/**
 * Product Schema
 */
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceForEmploy: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,

  },
  inventory: {
    type: Number,
  },
  quantitySold: {
    type: Number,
    default: 0,
  },
  cate: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cate',
    required: true,
  }],
  size: [{
    type: String,
  }],
  color: [{ type: String }],
  mainImage: {
    type: String,
  },
  subImage: [{
    type: String,
  }],
  shortName: {
    type: String,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true
});


/**
 * Statics
 */
ProductSchema.statics = {
  /**
   * Get Product
   * @param {ObjectId} id - The objectId of Product.
   * @returns {Promise<Product, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((product) => {
        if (product) {
          return product;
        }
        const err = new APIError('No such Product exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Products in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Products to be skipped.
   * @param {number} limit - Limit number of Products to be returned.
   * @returns {Promise<Product[]>}
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
 * @typedef Product
 */
module.exports = mongoose.model('Product', ProductSchema);
