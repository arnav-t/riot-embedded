import {config} from './config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client.jsx';
import ThemeContext from './components/theme-context.jsx';
require('./styles/main.scss');

ReactDOM.render(
    <Client {...config} />,
    document.getElementById('root')
);