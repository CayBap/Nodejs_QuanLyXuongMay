const Company = require('./company.model');


/**
 * Get company
 * @returns {company}
 */
async function get(req, res) {
  const company = await Company.findOne();
  return res.json(company);
}

/**
 * Create new company
 * @property {string} req.body.email - The email of company.
 * @property {string} req.body.phone - The phone of company.
 * @returns {company}
 */
async function create(req, res, next) {
  const company = await Company.findOne();
  if (company) {
    company.name = req.body.name;
    company.shortName = req.body.shortName;
    company.adress = req.body.adress;
    company.email = req.body.email;
    company.phoneNumber = req.body.phoneNumber;
    company.fax = req.body.fax;
    company.avatar = req.file ? req.file.filename.avatar : company.avatar;
    company.save()
      .then(savedcompany => res.json(savedcompany))
      .catch(e => next(e));
    return;
  }
  const newCompany = new Company({
    avatar: req.file.filename,
    name: req.body.name,
    shortName: req.body.shortName,
    adress: req.body.adress,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    fax: req.body.fax,
    // createdBy: req.currentUser._id,

  });

  newCompany.save()
    .then(savedcompany => res.json(savedcompany))
    .catch(e => next(e));
}


module.exports = { get, create, };
