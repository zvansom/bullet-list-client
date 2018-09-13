import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Daily from './Daily';

ReactDOM.render(<Daily />, document.getElementById('root'));
registerServiceWorker();
