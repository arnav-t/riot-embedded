import React from 'react';
import ReactDOM from 'react-dom';

// Import configuration
import {config} from './config';

// Styling
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require('./styles/styles.css');

import Client from './client.jsx';

// import Client from './client.jsx';
// let client = new Client(config);
// client.init();

ReactDOM.render(
	<Client {...config} />,
	document.getElementById('root')
);