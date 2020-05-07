/**
 * @fileoverview    Entry point of the bundle
 * 
 * @requires        NPM:react
 * @requires        NPM:react-dom
 * @requires        NPM:bootstrap
 * @requires        ./components/client.jsx
 */

import {config} from './config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require('./styles/styles.css');

ReactDOM.render(
    <Client {...config} />,
    document.getElementById('root')
);