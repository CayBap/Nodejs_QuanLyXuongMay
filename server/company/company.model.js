const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
/**
 * Company Schema
 */
const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
  },
  address: {
    type: String,
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
CompanySchema.statics = {
  /**
   * Get company
   * @param {ObjectId} id - The objectId of company.
   * @returns {Promise<Company, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((company) => {
        if (company) {
          return company;
        }
        const err = new APIError('No such company exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List companys in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of companys to be skipped.
   * @param {number} limit - Limit number of companys to be returned.
   * @returns {Promise<Company[]>}
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
 * @typedef Company
 */
module.exports = mongoose.model('Company', CompanySchema);
