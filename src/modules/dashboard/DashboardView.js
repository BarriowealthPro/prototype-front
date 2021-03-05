import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const DashboardView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  /** USE EFFECT */
  useEffect(() => {
    if(!localStorage.getItem('auth')) {
      history.push('/');
    } else {
    }
  }, [history]);

  /** FUNCTIONS */
  const handleOnClick = async () => {
    await localStorage.removeItem('auth');
    history.push('/');
  };

  /** COMPONENTS */
  return (
    <div>
      <h1>Dashboard</h1>
      <p>you are logged in <button onClick={() => handleOnClick()}>logout</button></p>
    </div>
  );
};

export default DashboardView;