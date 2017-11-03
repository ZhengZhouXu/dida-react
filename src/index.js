import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './common/styles/reset.css'
import './common/styles/base.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
