import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 1. REMOVE the old Ant Design CSS import
// import 'antd/dist/antd.min.css';

// 2. ADD the Bootstrap CSS import
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'; // Your custom global styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);