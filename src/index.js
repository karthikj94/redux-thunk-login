import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Logout from './components/Logout';
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import requireAuth from './utils/requireAuth';

if(localStorage.token){
  setAuthorizationToken(localStorage.token);
}
else{
  setAuthorizationToken(null);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route path='/logout' component={requireAuth(Logout)} />
      </Switch>  
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
