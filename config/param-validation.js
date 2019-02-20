const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string().email(),
      phone: Joi.string().regex(/(09|01||02||03||04||05||06||07||08)+([0-9]{8})/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {

    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      phone: Joi.string().regex(/(09|01||02||03||04||05||06||07||08)+([0-9]{8})/).required(),
      password: Joi.string().required()
    }
  }
};
