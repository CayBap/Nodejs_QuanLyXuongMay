const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
/**
 * Role Schema
 */
const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  parrent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  permistion: [{
    name: String,
    code: String,
    action: [{
      type: String,
    }],
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isLocked: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});


/**
 * Statics
 */
RoleSchema.statics = {
  /**
   * Get Role
   * @param {ObjectId} id - The objectId of Role.
   * @returns {Promise<Role, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((role) => {
        if (role) {
          return role;
        }
        const err = new APIError('No such Role exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Roles in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Roles to be skipped.
   * @param {number} limit - Limit number of Roles to be returned.
   * @returns {Promise<Role[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ isDelete: false }).populate('parrent')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Role
 */
module.exports = mongoose.model('Role', RoleSchema);
