import {loadMessages, loadHeader} from './roomBody';

export function roomsList(rooms) {
	var roomsList = document.getElementById('rooms-list');
	rooms.forEach(roomName => {
		let listObj = document.createElement('li');
		listObj.classList.add('list-group-item');
		listObj.classList.add('bg-dark');
		listObj.classList.add('px-1');
		listObj.innerHTML = roomName;
		roomsList.appendChild(listObj);
	});
}

export function appendRoom(roomName, roomId, currentRoomId, client) {
	if (document.getElementById(roomId) === null) {
		var roomsList = document.getElementById('rooms-list');
		var listObj = document.createElement('li');
		listObj.id = roomId;
		listObj.style.cursor = 'pointer';
		listObj.classList.add('list-group-item');
		listObj.classList.add('bg-dark');
		listObj.classList.add('px-1');
		listObj.addEventListener("click", () => {
			selectRoom(roomId, client);
		});
		if(roomId === currentRoomId) {
			listObj.classList.replace('bg-dark', 'active');
		}
		listObj.innerHTML = roomName;
		roomsList.appendChild(listObj);
	}
}

// Function handling clicks on a room
export function selectRoom(newRoomId, client) {
	var roomListObj = document.getElementById('rooms-list');
	roomListObj.childNodes.forEach(listItem => {
		listItem.classList.remove('active');
		listItem.classList.add('bg-dark');
	});
	document.getElementById(newRoomId).classList.add('active');
	document.getElementById(newRoomId).classList.remove('bg-dark');
	joinRoom(newRoomId, client);
}

// Function for loading a room
function joinRoom(roomId, client) {
	client.joinRoom(roomId).done(() => {
		console.log("Joined room!");
		var msgList = document.getElementById('msg-list');
		while (msgList.firstChild) {
			msgList.removeChild(msgList.firstChild);
		}
		var room = client.getRoom(roomId);
		loadHeader(room, client);
		loadMessages(room, client);
	});
}