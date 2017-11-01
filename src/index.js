import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header';
import registerServiceWorker from './registerServiceWorker';
import './common/styles/reset.css'
import './common/styles/base.css'

ReactDOM.render(<Header />, document.getElementById('root'));
registerServiceWorker();
