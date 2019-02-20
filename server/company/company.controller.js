const Company = require('./company.model');

/**
 * Load company and append to req.
 */
function load(req, res, next, id) {
  Company.get(id)
    .then((company) => {
      req.company = company; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get company
 * @returns {company}
 */
function get(req, res) {
  return res.json(req.company);
}

/**
 * Create new company
 * @property {string} req.body.email - The email of company.
 * @property {string} req.body.phone - The phone of company.
 * @returns {company}
 */
function create(req, res, next) {
  const company = new Company({
    name: req.body.name,
    shrortName: req.body.shrortName,
    address: req.body.address,
    createdBy: req.currentUser._id,
  });

  company.save()
    .then(savedcompany => res.json(savedcompany))
    .catch(e => next(e));
}

/**
 * Update existing company
 * @property {string} req.body.companyname - The companyname of company.
 * @property {string} req.body.mobileNumber - The mobileNumber of company.
 * @returns {company}
 */
function update(req, res, next) {
  const company = req.company;
  company.name = req.body.name;
  company.shortName = req.body.shortName;
  company.address = req.body.address;
  company.save()
    .then(savedcompany => res.json(savedcompany))
    .catch(e => next(e));
}

/**
 * Get company list.
 * @property {number} req.query.skip - Number of companys to be skipped.
 * @property {number} req.query.limit - Limit number of companys to be returned.
 * @returns {company[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Company.list({ limit, skip })
    .then(companys => res.json(companys))
    .catch(e => next(e));
}

/**
 * Delete company.
 * @returns {company}
 */
function remove(req, res, next) {
  const company = req.company;
  company.remove()
    .then(deletedcompany => res.json(deletedcompany))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
