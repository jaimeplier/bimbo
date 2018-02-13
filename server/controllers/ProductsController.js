const routeErr = require('../utils/routeErr.js');

const {
  Product,
  Factory,
  Organization,
} = require('../models');

const {
  getOrganizationFromSlug,
} = require('./../utils/databaseHelpers');

const removeDuplicates = require('./../utils/removeDuplicates');

// Route API Functions
// ------------------------------------------------------
function getProductsByOrganization(req, res, next) {
  getOrganizationFromSlug(req.params.slug, (err, organization) => {
    Factory
      .findAll({
        attributes: ['slug'],
        include: [{
          model: Organization,
          as: 'organizations',
          where: { id: organization.get('id') },
        },
        {
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'slug'],
          through: { attributes: [] },
        }],
      })
      .then((result) => {
        let slugArr = [];
        result.forEach((i) => { slugArr = slugArr.concat(i.get({ plain: true }).products); });
        const products = removeDuplicates(slugArr, 'slug');
        res.json({ err: false, products });
      })
      .catch(err => routeErr(res, next, err));
  });
}

module.exports = {
  getProductsByOrganization,
};
