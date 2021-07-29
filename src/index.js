import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import App from './App';
import Heading from './Heading';
import Upload from './Upload';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';
import ThreeGrid from './ThreeGrid';
// import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    {/* <Upload /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
