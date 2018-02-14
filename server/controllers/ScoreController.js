const FactoriesController = require('./FactoriesController.js');

const { authUserForFactory } = FactoriesController;

const Promise = require('bluebird');


const {
  Score,
  ScoreValue,
  ProductAttribute,
  Product,
  sequelize,
} = require('../models');

const {
  getFactoryFromSlug,
} = require('./../utils/databaseHelpers');

const routeErr = require('../utils/routeErr.js');
const { getProductFromSlug } = require('../utils/databaseHelpers.js');

// Route Functions
// ------------------------------------------------------

function createScores(req, res, next) {
  let totalScore = 100;
  const { factoryId } = req.locals.jwtAuth;
  let productId = 0;
  const userId = req.locals.jwtAuth.id;

  req.body.scores.forEach((element) => {
    totalScore -= element.value;
  });

  getProductFromSlug(req.params.product, (err, product) => {
    productId = product.id;
    Score.create({
      productId,
      userId,
      factoryId,
      lot: req.body.lot,
      note: req.body.note,
      score: totalScore,
    }).then(newScore => Promise.map(req.body.scores, value =>
      ScoreValue.create({
        scoreId: newScore.id,
        attributeId: value.attributeId,
        value: value.value,
      }).then(res.json({ ok: true }))
        .catch(err => routeErr(res, next, err))));
  });
}

function getLatestScores(req, res, next) {
  authUserForFactory(req, res, next, (user, factory) => {
    const page = parseInt(req.query.pageNo, 10);
    const limit = parseInt(req.query.size, 10);
    Score
      .findAndCountAll({
        where: { factoryId: factory.get('id') },
        attributes: ['productId', 'lot', 'note', 'totalScore', 'createdAt'],
        include: [
          {
            model: ScoreValue,
            as: 'scoreValues',
            attributes: ['value'],
            include: [{
              model: ProductAttribute,
              attributes: ['name', 'successCase', 'warningCase', 'failureCase'],
            }],
          },
          {
            model: Product,
            attributes: ['name', 'slug'],
          },
        ],
        limit,
        offset: limit * (page),
      })
      .then((scores) => {
        let result = [];
        scores.rows.forEach((element) => {
          result = result.concat(element.get({ plain: true }));
        });

        result.values = {};

        for (let i = 0; i < result.length; i += 1) {
          Object.assign(result[i], result[i].Product);
          delete result[i].Product;
          result[i].values = {};

          for (let j = 0; j < result[i].scoreValues.length; j += 1) {
            const newAttribute = {};
            Object.assign(
              newAttribute,
              result[i].scoreValues[j].ProductAttribute,
            );
            delete result[i].scoreValues[j].ProductAttribute;
            Object.assign(
              newAttribute,
              result[i].scoreValues[j],
            );
            result[i].values[newAttribute.name] = newAttribute;
            delete result[i].values[newAttribute.name].name;
          }
          delete result[i].scoreValues;
        }

        const pages = Math.ceil(result.length / limit);
        return res.json({ pageCount: false, result: { scores: result, pageCount: pages } });
      })
      .catch(err => routeErr(res, next, err));
  });
}

function getScore(req, res, next) {
  authUserForFactory(req, res, next, () => {
    Score
      .findOne({
        where: { id: req.query.scoreId },
        include: [
          {
            model: ScoreValue,
            as: 'scoreValues',
            attributes: ['value'],
            include: [{
              model: ProductAttribute,
              attributes: ['name', 'successCase', 'warningCase', 'failureCase'],
            }],
          },
          {
            model: Product,
          },
        ],
      })
      .then((score) => {
        if (score === null) {
          return res.json({ err: false, result: null });
        }
        const result = {};
        result.lot = score.get('lot');
        result.totalScore = score.get('totalScore');
        result.note = score.get('note');
        result.createdAt = score.get('createdAt');
        result.updatedAt = score.get('updatedAt');
        result.productName = score.get('Product').get('name');
        const scoreValues = score.get('scoreValues');
        let newAttribute;
        for (let j = 0; j < scoreValues.length; j += 1) {
          const attribute = scoreValues[j].get('Attribute');
          newAttribute = {};
          newAttribute.value = scoreValues[j].get('value');
          newAttribute.warningCase = attribute.get('warningCase');
          newAttribute.failureCase = attribute.get('failureCase');
          newAttribute.successCase = attribute.get('successCase');
          result[attribute.get('name')] = newAttribute;
        }
        return res.json({ err: false, result });
      })
      .catch(err => routeErr(res, next, err));
  });
}

function getFactoriesCompare(req, res, next) {
  let factoryId1;
  let factoryId2;
  getFactoryFromSlug(req.query.factory1, ((err, factory1) => {
    factoryId1 = factory1.get('id');
    getFactoryFromSlug(req.query.factory2, ((err, factory2) => {
      factoryId2 = factory2.get('id');
      Promise.all([
        getFactoryAverageScore(factoryId1),
        getFactoryAttributesAverage(factoryId1),
        getFactoryAverageScore(factoryId2),
        getFactoryAttributesAverage(factoryId2),
        getGlobalAttributesAverage(),
        getGlobalAverageScore(),
      ]).then((data) => {
        const allAttributes = [];
        const dataArray1 = {};
        data[1].forEach((i) => {
          allAttributes.push(i['ProductAttribute.name']);
          dataArray1[i['ProductAttribute.name']] = {
            failure: i['ProductAttribute.failureCase'],
            average: i.attributeAvg,
          };
        });
        const dataArray2 = {};
        data[3].forEach((i) => {
          if (!allAttributes.includes(i['ProductAttribute.name'])) {
            allAttributes.push(i['ProductAttribute.name']);
          }
          dataArray2[i['ProductAttribute.name']] = {
            failure: i['ProductAttribute.failureCase'],
            average: i.attributeAvg,
          };
        });
        const globalData = {};
        data[4].forEach((i) => {
          globalData[i['ProductAttribute.name']] = {
            failure: i['ProductAttribute.failureCase'],
            average: i.attributeAvg,
          };
        });
        return res.json({
          err: false,
          averageScore1: data[0],
          averageAttributes1: dataArray1,
          averageScore2: data[2],
          averageAttributes2: dataArray2,
          allAttributes,
          globalAttributes: globalData,
          globalAverage: data[5],
        });
      })
        .catch(err => routeErr(res, next, err));
    }));
  }));
}

function getFactoryAverageScore(factoryId) {
  return Score
    .findAll({
      attributes: factoryAverageScoreAttributes,
      where: {
        factoryId,
      },
    });
}

function getGlobalAverageScore() {
  return Score
    .findAll({
      attributes: factoryAverageScoreAttributes,
    });
}

function getFactoryAttributesAverage(factoryId) {
  return ScoreValue
    .findAll({
      include: [{
        model: Score,
        where: {
          factoryId,
        },
        attributes: [],
      },
      {
        model: ProductAttribute,
        attributes: ['name', 'failureCase'],
      }],
      group: ['attributeId'],
      attributes: [[sequelize.fn('AVG', sequelize.col('value')), 'attributeAvg']],
      raw: true,
    });
}

function getGlobalAttributesAverage() {
  return ScoreValue
    .findAll({
      include: [{
        model: ProductAttribute,
        attributes: ['name', 'failureCase'],
      }],
      group: ['attributeId'],
      attributes: [[sequelize.fn('AVG', sequelize.col('value')), 'attributeAvg']],
      raw: true,
    });
}

// Non Route API Functions
// ------------------------------------------------------

function globalDashboardKPIs() {
  return Promise
    .all([
      Score.count({ where: { totalScore: { $gt: 79 } } }),
      Score.count({ where: { totalScore: { $lt: 79 } } }),
    ])
    .then(data => ({
      successful: data[0],
      unsuccessful: data[1],
    }));
}

// ---------------- Helper Functions


// eslint-disable-next-line
function determineLotTotalScore() {

}

module.exports = {
  create: createScores,
  getLatestScores,
  globalDashboardKPIs,
  getScore,
  getFactoryAverageScore,
  getFactoriesCompare,
};

// Sequelize Attrbutes
const factoryAverageScoreAttributes = [
  [sequelize.fn('AVG', sequelize.col('totalScore')), 'averageScore'],
];
