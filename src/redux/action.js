import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
//import jwt from 'jsonwebtoken';
import { history } from '../history';

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

export function login(email, password) {
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    dispatch(setAuthentication(false));

    //axios.post(`${ROOT_URL}/signin`, { email, password })
    axios.post('https://reqres.in/api/login', { email, password })
      .then(response => {
          dispatch(setLoginPending(false));
          // if request is good...
          // - update state to indicate user is authenticated
          dispatch(setLoginSuccess(true));
          dispatch(setAuthentication(true));

          // - save the jwt token
          localStorage.setItem('token', response.data.token);
          setAuthorizationToken(response.data.token);
          //console.log(jwt.decode(response.data.token));
          // - redirect to the route '/feature'
          history.push('/logout');

      }).catch((error) => {
          // if request is bad...
          // - show an error to the user
          dispatch(setLoginPending(false));
          dispatch(setLoginError(error));
      });
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('token');
    setAuthorizationToken(null);
    dispatch(setLoginSuccess(false));
    dispatch(setAuthentication(false));
  }
}

function setAuthentication(isAuthenticated) {
  return {
    type: SET_AUTHENTICATION,
    isAuthenticated
  };
}

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
    loginError
  }
}
