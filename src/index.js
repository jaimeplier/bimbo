import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import 'nprogress/nprogress.css';
import './styles/application.scss';

import Routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import mainReducer from './reducers/mainReducer';
import { isUserLoggedIn } from './actions/userActions';

var store = createStore(
  mainReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.dispatch(isUserLoggedIn());

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
