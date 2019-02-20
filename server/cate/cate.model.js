const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
/**
 * Cate Schema
 */
const CateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
  isDelete: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true
});


/**
 * Statics
 */
CateSchema.statics = {
  /**
   * Get Cate
   * @param {ObjectId} id - The objectId of Cate.
   * @returns {Promise<Cate, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((cate) => {
        if (cate) {
          return cate;
        }
        const err = new APIError('No such Cate exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Cates in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Cates to be skipped.
   * @param {number} limit - Limit number of Cates to be returned.
   * @returns {Promise<Cate[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ isDelete: false })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Cate
 */
module.exports = mongoose.model('Cate', CateSchema);
