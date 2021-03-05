import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './auth.actions.types'
import Axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

/** LOGIN ACTIONS */
const login = () => {
  return {
    type: LOGIN,
  };
};

const loginSuccess = (response) => {
  return {
    type: LOGIN_SUCCESS,
    payload: response,
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export const loginAction = (loginData) => {
  return async (dispatch) => {
    dispatch(login);
    try {
      const response = await Axios.post(`${baseUrl}/auth/login`, loginData);
      const { token } = await response.data;
      await localStorage.setItem('auth', JSON.stringify(token));
      dispatch(loginSuccess('login success'));
    } catch (err) {
      dispatch(loginError(err?.response?.data?.msg || 'error on login'));
    }
  };
};

/** SIGN ACTIONS */
const signup = () => {
  return {
    type: SIGNUP,
  };
};

const signupSuccess = (response) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: response,
  };
};

const signupError = (error) => {
  return {
    type: SIGNUP_ERROR,
    payload: error,
  };
};

export const signupAction = (signupData) => {
  return async (dispatch) => {
    dispatch(signup);
    try {
      const response = await Axios.post(`${baseUrl}/auth/sign-up`, signupData);
      if (response.status === 401) {
        const { msg } = await response.data;
        dispatch(signupError(msg));
      } else {
        const { msg } = response.data;
        dispatch(signupSuccess(msg));
      };
    } catch (err) {
      dispatch(signupError(err?.response?.data?.msg || 'error on sign up'));
    }
  };
};

/** RESET ACTIONS */
export const resetAction = () => {
  return async (dispatch) => {
    await dispatch(signupSuccess(null));
    await dispatch(signupError(null));
    await dispatch(loginSuccess(null));
    await dispatch(loginError(null));
  };
};


