import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.getItem('auth')){
        return <Component {...props} />
      }
      else {
        return <Redirect to="/" />
      }
    }}
  />
);
