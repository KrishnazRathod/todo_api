import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import Store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="523136523485-i5hlgbms4flljntj4t47rrqmsjq2c1bc.apps.googleusercontent.com">
    <Provider store={Store}>
      <App />
    </Provider>

  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
