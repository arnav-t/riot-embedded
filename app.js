import {config} from './config.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/client.jsx';
import ThemeContext from './components/theme-context.jsx';
require('./styles/main.scss');

ReactDOM.render(
    <ThemeContext.Provider value={{theme: 'dark', highlight: 'green'}}>
        <Client {...config} />
    </ThemeContext.Provider>,
    document.getElementById('root')
);