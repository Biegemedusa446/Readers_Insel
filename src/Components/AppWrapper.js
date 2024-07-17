// AppWrapper.js
import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import App from '../App';

const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error);
  if (event === 'onReady') {
    console.log('Keycloak ready');
  }
  if (event === 'onInitError') {
    console.error('Keycloak initialization error:', error);
  }
};

const tokenLogger = (tokens) => {
  console.log('onKeycloakTokens', tokens);
};

const AppWrapper = () => (
  <ReactKeycloakProvider
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
  >
    <App />
  </ReactKeycloakProvider>
);

export default AppWrapper;