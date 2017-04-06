import React from 'react';
import ReactDOM from 'react-dom';

import 'nprogress/nprogress.css';
import './styles/application.scss';

import Routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('root')
);
