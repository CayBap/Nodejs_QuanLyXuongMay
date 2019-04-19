const Role = require('./role.model');
const changeToSlug = require('../helpers/changeToSlug');
/**
 * Load Role and append to req.
 */
function load(req, res, next, id) {
  Role.get(id)
    .then((role) => {
      req.role = role; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Role
 * @returns {Role}
 */
function get(req, res) {
  return res.json(req.role);
}

/**
 * Create new Role
 * @property {string} req.body.email - The email of Role.
 * @property {string} req.body.phone - The phone of Role.
 * @returns {Role}
 */
function create(req, res, next) {
  console.log(req.body);
  const role = new Role({
    name: req.body.name,
    slug: changeToSlug(req.body.name),
    parrent: req.body.parrent || undefined,
    createdBy: req.currentUser._id,
    description: req.body.description
  });

  role.save()
    .then(savedRole => res.json(savedRole))
    .catch(e => next(e));
}

/**
 * Update existing Role
 * @property {string} req.body.Catename - The Catename of Role.
 * @property {string} req.body.mobileNumber - The mobileNumber of Role.
 * @returns {Role}
 */
function update(req, res, next) {
  const role = req.role;
  role.name = req.body.name;
  role.slug = changeToSlug(req.body.name);
  role.description = req.body.description;
  role.parrent = req.body.parrent;
  role.save()
    .then(savedRole => res.json(savedRole))
    .catch(e => next(e));
}

/**
 * Get Role list.
 * @property {number} req.query.skip - Number of Cates to be skipped.
 * @property {number} req.query.limit - Limit number of Cates to be returned.
 * @returns {Role[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Role.list({ limit, skip })
    .then(cates => res.json(cates))
    .catch(e => next(e));
}

/**
 * Delete Role.
 * @returns {Role}
 */
function remove(req, res, next) {
  const role = req.role;
  role.isDelete = true;
  role.save()
    .then(deletedRole => res.json(deletedRole))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
