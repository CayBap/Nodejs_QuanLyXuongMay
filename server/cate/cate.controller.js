const Cate = require('./cate.model');

/**
 * Load Cate and append to req.
 */
function load(req, res, next, id) {
  Cate.get(id)
    .then((cate) => {
      req.cate = cate; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Cate
 * @returns {Cate}
 */
function get(req, res) {
  return res.json(req.cate);
}

/**
 * Create new Cate
 * @property {string} req.body.email - The email of Cate.
 * @property {string} req.body.phone - The phone of Cate.
 * @returns {Cate}
 */
function create(req, res, next) {
  const cate = new Cate({
    name: req.body.name,
    shortName: req.body.shortName,
    address: req.body.address,
    createdBy: req.currentUser._id,
    description: req.body.description
  });

  cate.save()
    .then(savedCate => res.json(savedCate))
    .catch(e => next(e));
}

/**
 * Update existing Cate
 * @property {string} req.body.Catename - The Catename of Cate.
 * @property {string} req.body.mobileNumber - The mobileNumber of Cate.
 * @returns {Cate}
 */
function update(req, res, next) {
  const cate = req.cate;
  cate.name = req.body.name;
  cate.shortName = req.body.shortName;
  cate.description = req.body.description;
  cate.save()
    .then(savedCate => res.json(savedCate))
    .catch(e => next(e));
}

/**
 * Get Cate list.
 * @property {number} req.query.skip - Number of Cates to be skipped.
 * @property {number} req.query.limit - Limit number of Cates to be returned.
 * @returns {Cate[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Cate.list({ limit, skip })
    .then(Cates => res.json(Cates))
    .catch(e => next(e));
}

/**
 * Delete Cate.
 * @returns {Cate}
 */
function remove(req, res, next) {
  const cate = req.cate;
  cate.isDelete = true;
  cate.save()
    .then(deletedCate => res.json(deletedCate))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
