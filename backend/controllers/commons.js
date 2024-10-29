import rules from '../data/convertingRules.json' assert { type: 'json' };

export function getConvert(req, res, next) {
  res.render('converter', {
    title: 'Convert Session Report',
    rules: JSON.stringify(rules, null, 1),
  });
}

export function getHealth(req, res, next) {
  res.json({ status: 'ok' });
}
