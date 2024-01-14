import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainCompo from './Components/MainComponent';
import Signup from './Components/SignupComponent';
import IndexComponent from './Components/indexComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IndexComponent/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
