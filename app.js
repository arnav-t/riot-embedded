// Import configuration
import {config} from './config';

// Components
import {roomsList, appendRoom, selectRoom} from './components/roomsList';

// Styling
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require('./styles/styles.css');

import Client from './client';
let client = new Client(config);
client.init();

/*
// Initialize matrix-js-sdk
var sdk = require('matrix-js-sdk');
var client = sdk.createClient({
	baseUrl: config.baseUrl,
	accessToken: config.accessToken,
	userId: config.userId
});
//var client = sdk.createClient(config.baseUrl);

// Start client
client.startClient();

// Sync client and load messages
client.once('sync', function(state, prevState, res) {
	console.log(state); // state will be 'PREPARED' when the client is ready to use
	
	// Populate with messages from default room
	client.joinRoom(config.roomId).done(() => {
		//selectRoom(config.roomId, client);
	});
});

// Populate list of rooms
client.on("Room.timeline", function(event, room, toStartOfTimeline) {
	let roomName = room.name; 
	let roomId = room.roomId;
	appendRoom(roomName, roomId, config.roomId, client);
});

// Function for handling sending messages
var msgInput = document.getElementById('send-input');
msgInput.onkeyup = function sendMessage() {
	var key = window.event.keyCode;

	if (key == 13) {
		console.log('Message shall be sent.');
	}
}

/*
// Disabled as joined rooms are shown in lieu of public rooms
// Populate with the list of public rooms
client.publicRooms((err, data) => {
	var rooms = [];
	for(var room in data['chunk']) {
		let name = data['chunk'][room]['canonical_alias'];
		if(name !== undefined)
			rooms.push(name);
	}
	roomsList(rooms);
});
*/