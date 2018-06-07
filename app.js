const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const db = require('./config/db');
const bodyParser = require('body-parser');
const jwtauth = require('./middleware/jwtauth');

mongoose.connect(db.db);
mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 3001;

//routers
const index = require('./routers/index');
const user = require('./routers/user');
const post = require('./routers/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + '/src/assets/favicon.ico'));
app.use(express.static('dist'));
app.use(jwtauth);
app.use('/', index);
app.use('/user', user);
app.use('/post', post);

app.listen(port, () => {
  console.log('app listening on port ' + port + '.');
  console.log(new Date());
});

module.exports = app;
