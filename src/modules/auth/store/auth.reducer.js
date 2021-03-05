import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './auth.actions.types'

const initialState = {
  loading: false,
  SignupSuccess: null,
  SignupError: null,
  LoginSuccess: null,
  LoginError: null,
};

const authReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        loading: true,
        SignupSuccess: null,
        SignupError: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        SignupSuccess: action.payload,
        SignupError: null,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        SignupSuccess: null,
        SignupError: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
        LoginSuccess: null,
        LoginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        LoginSuccess: action.payload,
        LoginError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        LoginSuccess: null,
        LoginError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;