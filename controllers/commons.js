const rules = require('../data/rules.json');

exports.getConvert = (req, res, next) => {
  res.render('converter', {
    title: 'Convert Session Report',
    rules: JSON.stringify(rules, null, 1),
  });
};
