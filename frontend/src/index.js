import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import CustomRoutes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
