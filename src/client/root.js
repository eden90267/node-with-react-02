import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import App from '../containers/App';
import Main from '../containers/Main';
import Login from "../components/Login";
import Register from "../components/Register";

export default (
  <Router history={browserHistory} component={App}>
    <Route path="/" component={App}/>
    <IndexRoute path="/main" component={Main}/>
    <Route path="/main" component={Main}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
  </Router>
);