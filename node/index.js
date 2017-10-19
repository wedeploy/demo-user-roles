const express = require('express');
const wedeployMiddleware = require('wedeploy-middleware');
const path = require('path');

const app = express();

app.use(express.static('public/assets/styles'));
app.use(express.static('public/assets/scripts'));

const adminMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['admin']
});

const freeMiddleware = wedeployMiddleware.auth({
  url: 'auth-userroles.wedeploy.io',
  scopes: ['free']
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/static/index.html'));
})

app.get('/user', freeMiddleware, function(req, res) {
  console.log('User: ', res.locals.auth.currentUser);
})

app.get('/admin', adminMiddleware, function(req, res) {
  console.log('User: ', res.locals.auth.currentUser);
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})

function retrieveCurrentUser(res) {
  if (
    res &&
    res.locals &&
    res.locals.auth &&
    res.locals.auth.currentUser
  ) {
    return res.locals.auth.currentUser;
  }
}