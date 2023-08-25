const path = require('path');
const errorController = require('./controllers/errors');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const commonRoutes = require('./routes/common');

app.use(express.static(path.join(__dirname, 'public')));
app.use(commonRoutes);
app.use(errorController.get404);

app.listen(666);
