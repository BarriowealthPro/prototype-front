import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';
import DashboardView from '../modules/dashboard/DashboardView';
import LoginView from '../modules/auth/LoginView';
import SignupView from '../modules/auth/SignupView';
import { PrivateRoute } from './PrivateRoute';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route path="/signup" component={SignupView} />
        <Route path="/linkedin" component={LinkedInPopUp} />
        <PrivateRoute path="/dashboard" component={DashboardView} />
      </Switch>
    </Router>
  );
};

export default Routes;