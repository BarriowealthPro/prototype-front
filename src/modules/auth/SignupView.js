import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InitialSignupData } from './authmodels/auth.model';
import { useForm } from 'react-hook-form';
import { signupAction, resetAction } from './store/auth.actions';
import Swal from 'sweetalert2';

const selectSignupSuccess = (state) => state.auth.SignupSuccess;
const selectSignupError = (state) => state.auth.SignupError;

const SignupView = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  /** USE SELECTOR */
  const signupSuccess = useSelector(selectSignupSuccess);
  const signupError = useSelector(selectSignupError);

  /** USE STATE */
  const [signupData, setSignupData] = useState(InitialSignupData);

  /** DESTRUCTURING */
  const { email, username, password, confirm_password } = signupData;

  /** USE EFFECT */
  useEffect(() => {
    dispatch(resetAction);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (signupSuccess) {
      Swal.fire({
        icon: 'success',
        title: signupSuccess,
        showConfirmButton: false,
        timer: 1500
      }).then(result => {
        if (result.dismiss === Swal.DismissReason.timer) {
          dispatch(resetAction());
        }
      });
      setSignupData(InitialSignupData);
    }
  }, [dispatch, signupSuccess]);

  useEffect(() => {
    if (signupError) {
      Swal.fire({
        title: signupError,
      }).then(_ => {
        if (_.isConfirmed) {
          dispatch(resetAction());
        }
      });
    }
  }, [dispatch, signupError]);

  /** FUNCTIONS */
  const handleOnChangeSignupData = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmitSignupData = (data) => {
    dispatch(signupAction(signupData));
  };

  /** COMPONENTS */
  return (
    <>
      <div className="main-card">
        <h3 className="main-card__title">
          Sign up
        </h3>
        <form onSubmit={handleSubmit(handleOnSubmitSignupData)}>
          <label htmlFor="">Email</label>
          <input 
            className={errors.email ? 'error' : ''}
            type="text" 
            name="email" 
            placeholder="email"
            onChange={e => handleOnChangeSignupData(e)}
            value={email}
            ref={register({
              required: {
                value: true,
                message: 'this field is required'
              }
            })}
          />
          {errors.email && <li className="error-list">{errors.email.message}</li>}
          <label htmlFor="">Username</label>
          <input 
            className={errors.username ? 'error' : ''}
            type="text" 
            name="username" 
            placeholder="username"
            onChange={e => handleOnChangeSignupData(e)}
            value={username}
            ref={register({
              required: {
                value: true,
                message: 'this field is required'
              }
            })}
          />
          {errors.username && <li className="error-list">{errors.username.message}</li>}
          <label htmlFor="">Password</label>
          <input
            className={errors.password ? 'error' : ''}
            type="password" 
            name="password" 
            placeholder="password" 
            onChange={e => handleOnChangeSignupData(e)}
            value={password}
            ref={register({
              required: {
                value: true,
                message: 'this field is required'
              }
            })}
          />
          {errors.password && <li className="error-list">{errors.password.message}</li>}
          <label htmlFor="">Confirm Password</label>
          <input
            className={errors.confirm_password ? 'error' : ''}
            type="password" 
            name="confirm_password" 
            placeholder="Confirm password" 
            onChange={e => handleOnChangeSignupData(e)}
            value={confirm_password}
            ref={register({
              required: {
                value: true,
                message: 'this field is required'
              }
            })}
          />
          {errors.confirm_password && <li className="error-list">{errors.confirm_password.message}</li>}
          {/* <label htmlFor="">Confirm Password</label>
          <input 
            className={errors.confirm_password ? 'error' : ''}
            type="password" 
            name="confirm_password" 
            placeholder="confirm_password"
            onChange={e => handleOnChangeSignupData(e)}
            value={confirm_password}
            ref={register({
              required: {
                value: true,
                message: 'this field is required'
              }
            })}
          />
          {errors.confirm_password && <li className="error-list">{errors.confirm_password.message}</li>} */}
          <button type="submit" className="main-card__submit-botton">Sign up</button>
        </form>
      </div>
      <p>
        Have an account? <Link to="/">Login</Link>
      </p>
    </>
  );
};

export default SignupView;