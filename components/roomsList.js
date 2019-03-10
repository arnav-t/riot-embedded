export function roomsList(rooms) {
	var roomsList = document.getElementById('rooms-list');
	rooms.forEach(roomName => {
		let listObj = document.createElement('li');
		listObj.classList.add('list-group-item');
		listObj.classList.add('bg-dark');
		listObj.innerHTML = roomName;
		roomsList.appendChild(listObj);
	});
}

export function appendRoom(roomName, roomId, currentRoomId) {
	if (document.getElementById(roomId) === null) {
		var roomsList = document.getElementById('rooms-list');
		var listObj = document.createElement('li');
		listObj.id = roomId;
		listObj.classList.add('list-group-item');
		listObj.classList.add('bg-dark');
		if(roomId === currentRoomId) {
			listObj.classList.replace('bg-dark', 'active');
		}
		listObj.innerHTML = roomName;
		roomsList.appendChild(listObj);
	}
}