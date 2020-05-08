/**
 * @fileoverview    Entry point of the bundle
 * 
 * @requires        NPM:react
 * @requires        NPM:react-dom
 * @requires        ./components/client.jsx
 * @requires        ./styles/styles.css
 */

import {config} from './config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client.jsx';
require('./styles/styles.css');

ReactDOM.render(
    <Client {...config} />,
    document.getElementById('root')
);