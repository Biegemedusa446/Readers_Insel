import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWrapper from './Components/AppWrapper';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();