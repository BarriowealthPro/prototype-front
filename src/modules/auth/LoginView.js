import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InitialLoginData } from './authmodels/auth.model';
import { loginAction, resetAction } from './store/auth.actions';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import LinkedInComponent from './components/LinkedIn';

const selectLoginSuccess = (state) => state.auth.LoginSuccess;
const selectLoginError = (state) => state.auth.LoginError;

const LoginView = () => {
  const dispatch = useDispatch();
  const history = useHistory();  
  const { register, handleSubmit, errors } = useForm();

  /** USE SELECTOR */
  const loginSuccess = useSelector(selectLoginSuccess);
  const loginError = useSelector(selectLoginError);

  /** USE STATE */
  const [loginData, setLoginData] = useState(InitialLoginData);

  /** DESTRUCTURING */
  const { email, password } = loginData;

  /** USE EFFECT */
  useEffect(() => {
    dispatch(resetAction);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loginSuccess && localStorage.getItem('auth')) {
      setLoginData(InitialLoginData);
      Swal.fire({
        icon: 'success',
        title: loginSuccess,
        showConfirmButton: false,
        timer: 1500
      }).then(result => {
        if (result.dismiss === Swal.DismissReason.timer) {
          history.push('/dashboard');
        }
      });
    }
  }, [loginSuccess, history]);

  useEffect(() => {
    if (loginError) {
      Swal.fire({
        title: loginError,
      }).then(_ => {
        if (_.isConfirmed) {
          dispatch(resetAction());
        }
      });
    }
  }, [dispatch, loginError]);

  /** FUNCTIONS */
  const handleOnChangeLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmitLoginData = (data) => {
    dispatch(loginAction(loginData));
  };

  const handleOnLoginLinkedin = async () => {
    console.log('linkedin');
  }

  /** COMPONENTS */
  return (
    <>
      <div className="main-card">
        <h3 className="main-card__title">
          Login
        </h3>
        <form onSubmit={handleSubmit(handleOnSubmitLoginData)}>
        <label htmlFor="">email</label>
          <input 
            className={errors.email ? 'error' : ''}
            type="text" 
            name="email" 
            placeholder="email"
            onChange={e => handleOnChangeLoginData(e)}
            value={email}
            ref={register({
              required: {
                value: true,
                message: 'this field is required'
              }
            })}
          />
          {errors.email && <li className="error-list">{errors.email.message}</li>}
          <label htmlFor="">Password</label>
          <input
            className={errors.password ? 'error' : ''}
            type="password" 
            name="password" 
            placeholder="password" 
            onChange={e => handleOnChangeLoginData(e)}
            value={password}
            ref={register({
              required: {
                value: true,
                message: 'this field is required'
              }
            })}
          />
          {errors.password && <li className="error-list">{errors.password.message}</li>}
          <button type="submit" className="main-card__submit-botton">Log In</button>
        </form>
        <LinkedInComponent />
      </div>
      <p>
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </>
  );
};

export default LoginView;