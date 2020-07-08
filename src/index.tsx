import React from 'react';
import ReactDOM from 'react-dom';
import authentication from '@kdpw/msal-b2c-react';
import { Provider as StoreProvider } from 'react-redux';
import store from './store';

import * as serviceWorker from './serviceWorker';

authentication.initialize({
  // you can user your b2clogin.com domain here, setting is optional, will default to this
  instance: 'https://AIAustraliaB2C.b2clogin.com/tfp/',
  // your B2C tenant, you can also user tenants GUID here
  tenant: 'AIAustraliaB2C.onmicrosoft.com',
  // the policy to use to sign in, can also be a sign up or sign in policy
  signInPolicy: 'B2C_1_SignUpAndSignIn',
  // the policy to use for password reset
  resetPolicy: 'B2C_1_PasswordReset',
  // the the B2C application you want to authenticate with (that's just a random GUID - get yours from the portal)
  applicationId: 'a6cbdbad-8f34-46a2-bcf9-f2c865e354ce',
  // where MSAL will store state - localStorage or sessionStorage
  cacheLocation: 'sessionStorage',
  // the scopes you want included in the access token
  scopes: ['https://AIAustraliaB2C.onmicrosoft.com/api/user_impersonation'],
  // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
  redirectUri: 'https://jiembadev.azurewebsites.net/',
  // optional, the URI to redirect to after logout
  postLogoutRedirectUri: 'https://jiembadev.azurewebsites.net/',
  // optional, default to true, set to false if you change instance
  validateAuthority: false,
  // optional, default to false, set to true if you only want to acquire token silently and avoid redirections to login page
  silentLoginOnly: false
});

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

serviceWorker.register();
