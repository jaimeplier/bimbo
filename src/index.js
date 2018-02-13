import 'nprogress/nprogress.css';
import 'react-table/react-table.css';

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import './utils/i18n';
import './styles/application.scss';

import Routes from './routes';
import mainReducer from './reducers/mainReducer';

import { isUserLoggedIn } from './actions/userActions';

let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    mainReducer,
    compose(
      applyMiddleware(thunkMiddleware),
      // eslint-disable-next-line
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
} else {
  store = createStore(
    mainReducer,
    compose(applyMiddleware(thunkMiddleware)),
  );
}

store.dispatch(isUserLoggedIn());

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
