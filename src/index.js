import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import 'nprogress/nprogress.css';
import 'react-table/react-table.css';
import './styles/application.scss';

import Routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import mainReducer from './reducers/mainReducer';
import { isUserLoggedIn } from './actions/userActions';

console.log('the env thing: ', process.env);
if(process.env.NODE_ENV == 'development') {
  var store = createStore(
    mainReducer,
    compose(
      applyMiddleware(thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
} else {
  var store = createStore(
    mainReducer,
    compose(
      applyMiddleware(thunkMiddleware)
    )
  )
}

store.dispatch(isUserLoggedIn());

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
