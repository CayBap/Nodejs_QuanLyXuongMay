const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
const Role = require('../role/role.model');
/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  try {
    const user = await User.getUserByPhone(req.body.phone);

    if (user && user.comparePassword(req.body.password)) {
      if (user.isActive === false) {
        const err = new APIError('Tài khoản của bạn bị khóa, vui lòng liên hệ với admin!', httpStatus.UNAUTHORIZED, true);
        return next(err);
      } else if (user.isActive === true) {
        const jwtPayload = {
          phone: user.phone,
          name: `${user.lastName} ${user.firstName}`,
        };

        const jwtData = {
          expiresIn: config.jwtDuration,
        };

        const secret = config.jwtSecret;
        const token = jwt.sign(jwtPayload, secret, jwtData);
        const permistion = await Role.findById(user.roleId || '');
        return res.json({
          token,
          phone: user.phone,
          name: `${user.lastName} ${user.firstName}`,
          role: user.role,
          id: user._id,
          avatar: user.avatar,
          permistion,
        });
      }
      const err = new APIError('Tài khoản của bạn chưa kích hoạt', httpStatus.UNAUTHORIZED, true);
      return next(err);
    }
    const err = new APIError('Sai mật khẩu hoặc tài khoản!', httpStatus.UNAUTHORIZED, true);
    return next(err);
  } catch (e) {
    const err = new APIError('Lỗi đăng nhập, hãy liên hệ admin để được trợ giúp!', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
}
/**
 * checkLogin
 * @param req
 * @param res
 * @returns {*}
 */
function authen(req, res, next) {
  const secret = config.jwtSecret;
  const token = req.headers['x-access-token'];

  jwt.verify(token, secret, async (error, decode) => {
    if (error) {
      const err = new APIError('Lỗi xác thực không thành công', httpStatus.UNAUTHORIZED, true);
      return next(err);
    }

    const currentTiem = new Date().getTime() / 1000;
    if (currentTiem < decode.exp) {
      try {
        const user = await User.getUserByPhone(decode.phone);
        if (user.isActive === false) {
          const err = new APIError('Tài khoản của bạn bị khóa, vui lòng liên hệ với admin!', httpStatus.UNAUTHORIZED, true);
          return next(err);
        } else if (user.isActive === true) {
          req.currentUser = user; // eslint-disable-line no-param-reassign
          return next();
        }

        const err = new APIError('Tài khoản của bạn chưa kích hoạt', httpStatus.UNAUTHORIZED, true);
        return next(err);
      } catch (e) {
        const err = new APIError('Lỗi không tìm thấy tài khoản', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }
    } else {
      const err = new APIError('Vui lòng đăng nhập lại', httpStatus.UNAUTHORIZED, true);
      return next(err);
    }
  });
}
/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber, authen };
