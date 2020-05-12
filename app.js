import {config} from './config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client.jsx';
require('./styles/styles.css');

ReactDOM.render(
    <Client {...config} />,
    document.getElementById('root')
);