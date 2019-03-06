require('./styles/styles.css');
var sdk = require('matrix-js-sdk');

var client = sdk.createClient("https://matrix.org");

roomsList = document.getElementById('rooms-list');
client.publicRooms(function(err, data) {
	for(var room in data['chunk']) {
		let name = data['chunk'][room]['canonical_alias'];
		let listObj = document.createElement('li');
		listObj.innerHTML = name;
		roomsList.appendChild(listObj);
	}
});