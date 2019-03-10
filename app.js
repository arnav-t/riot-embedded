import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { checkObjectHasNoAdditionalKeys } from 'matrix-js-sdk/lib/utils';
require('./styles/styles.css');

var sdk = require('matrix-js-sdk');
var client = sdk.createClient("https://matrix.org");

//var room = new sdk.Room('!DsPWATSonLtSABXLys:matrix.org', client, myUserId, {timelineSupport: true});
var room = client.getRoom('!DsPWATSonLtSABXLys:matrix.org');
//console.log(room.timeline);

// Populate with a list of public rooms
var roomsList = document.getElementById('rooms-list');
client.publicRooms(function(err, data) {
	for(var room in data['chunk']) {
		let name = data['chunk'][room]['canonical_alias'];
		if(name === undefined)
			continue;
		let listObj = document.createElement('li');
		listObj.classList.add('list-group-item');
		listObj.innerHTML = name;
		roomsList.appendChild(listObj);
	}
});

