import React from 'react';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Routes />
      </div>
    </Provider>
  );
};

export default App;
