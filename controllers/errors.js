export function get404(req, res, next) {
  res.render('404', { title: 'Not found!' });
}
