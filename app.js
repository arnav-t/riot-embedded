// Components
import {roomsList, appendRoom} from './components/roomsList';
import {loadMessages, loadHeader} from './components/roomBody';

// Styling
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require('./styles/styles.css');

// Import credentials
import {myUserId, myAccessToken} from './creds';

// Initialize matrix-js-sdk
const currentRoomId = '!ahcBstQiPShMcpZxLK:jki.re';
var sdk = require('matrix-js-sdk');
var client = sdk.createClient({
	baseUrl: "https://matrix.org",
	accessToken: myAccessToken,
	userId: myUserId
});

// Start client
client.startClient();

// Sync client and load messages
client.once('sync', function(state, prevState, res) {
	console.log(state); // state will be 'PREPARED' when the client is ready to use
	
	// Populate with messages from default room
	client.joinRoom(currentRoomId).done(() => {
		console.log("Joined default room!");
		var room = client.getRoom(currentRoomId);
		loadHeader(room.name, room.myUserId);
		loadMessages(room.timeline);
	});
});

// Populate list of rooms
client.on("Room.timeline", function(event, room, toStartOfTimeline) {
	let roomName = room.name; 
	let roomId = room.roomId;
	appendRoom(roomName, roomId, currentRoomId);
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

