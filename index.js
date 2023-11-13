import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


