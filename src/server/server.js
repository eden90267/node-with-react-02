const express = require('express');
const app = express();
const path = require('path');
const config = require('../../webpack.config');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api');

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  saveUninitialized: true, // don't create session until something store,
  resave: false, // don't save session if unmodified
  secret: "eden-liu",
  key: 'auth_token',
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
  store: new MongoStore({
    url: require('../config').dbURL
  })
}));

api.api(app);


import React from 'react';
import {renderToString} from "react-dom/server";
import {configureStore} from "../redux/store";
import {createRoutes, match, RouterContext} from "react-router";
import root from "../client/root";
import {getMuiTheme} from "material-ui/styles/index";
import injectTapEventPlugin from 'react-tap-event-plugin';
import {MuiThemeProvider} from "material-ui";
import {Provider} from "react-redux";
injectTapEventPlugin();
const routes = createRoutes(root);

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));



app.get('*', (req, res) => {

  let initialState = {
    todos: [{
      id: 0, completed: false, text: 'initial for demo'
    }],
    userInfo: {}
  };

  const store = configureStore(initialState);
  const muiTheme = getMuiTheme({
    userAgent: req.headers['user-agent']
  });
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <RouterContext {...renderProps} />
          </MuiThemeProvider>
        </Provider>
      );
      let state = store.getState();
      let page = renderFullPage(content, state);
      return res.status(200).send(page);
    } else {
      res.status(404).send('Not Found');
    }
  });

});

const renderFullPage = (html, preloadedState) => (`
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Todo List</title>
  <link rel="stylesheet" type="text/css" href="/css/reset.css">
</head>
<body>
<div id="app">${html}</div>
<script >
window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}\
</script>
<script src="vendor.bundle.js"></script>
<script src="bundle.js"></script>
</body>
</html>
`);

var port = 3000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});