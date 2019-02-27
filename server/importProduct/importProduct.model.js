const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
/**
 * ImportProduct Schema
 */
const ImportProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
  },
  unit: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  timeToEnd: {
    type: String,
  },
  amount: {
    type: Number,
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
ImportProductSchema.statics = {
  /**
   * Get ImportProduct
   * @param {ObjectId} id - The objectId of ImportProduct.
   * @returns {Promise<ImportProduct, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((importProduct) => {
        if (importProduct) {
          return importProduct;
        }
        const err = new APIError('No such ImportProduct exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List ImportProducts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of ImportProducts to be skipped.
   * @param {number} limit - Limit number of ImportProducts to be returned.
   * @returns {Promise<ImportProduct[]>}
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
 * @typedef ImportProduct
 */
module.exports = mongoose.model('ImportProduct', ImportProductSchema);
