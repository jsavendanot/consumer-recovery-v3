import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';

import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';

import theme from './theme';
import routes from './routes';
import './assets/scss/index.scss';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router history={history}>{renderRoutes(routes)}</Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
