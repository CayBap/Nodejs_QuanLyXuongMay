const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
/**
 * ExportProduct Schema
 */
const ExportProductSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
  },
  amount: Number,
  customer: {
    name: String,
    phone: String,
    email: String,
  },
  products: [
    {
      name: String,
      color: String,
      size: String,
      amount: Number,
      price: Number,

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      }
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false,
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
ExportProductSchema.statics = {
  /**
   * Get ExportProduct
   * @param {ObjectId} id - The objectId of ExportProduct.
   * @returns {Promise<ExportProduct, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((exportProduct) => {
        if (exportProduct) {
          return exportProduct;
        }
        const err = new APIError('No such ExportProduct exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List ExportProducts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of ExportProducts to be skipped.
   * @param {number} limit - Limit number of ExportProducts to be returned.
   * @returns {Promise<ExportProduct[]>}
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
 * @typedef ExportProduct
 */
module.exports = mongoose.model('ExportProduct', ExportProductSchema);
