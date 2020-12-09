import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
