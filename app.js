// Import configuration
import {config} from './config';

// Styling
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require('./styles/styles.css');

import Client from './client';
let client = new Client(config);
client.init();
