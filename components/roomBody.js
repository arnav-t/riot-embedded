export function loadMessages(timeline) {
	var messagesList = document.getElementById('msg-list');
	timeline.forEach(event => {
		let listObj = document.createElement('li');
		listObj.id = event.event_id;
		listObj.classList.add('list-group-item');
		
		let usernameObj = document.createElement('h6');
		usernameObj.innerHTML = event.sender['name'] + ' ';
		let userIdObj = document.createElement('i');
		userIdObj.innerHTML = event.sender['userId'];
		userIdObj.classList.add('text-muted');
		usernameObj.appendChild(userIdObj);

		let messageObj = document.createElement('p');
		messageObj.innerHTML = event.event.content['body'];

		listObj.appendChild(usernameObj);
		listObj.appendChild(messageObj);
		messagesList.appendChild(listObj);
	});
}

export function loadHeader(name, myUserId) {
	var title = document.getElementById('room-title');
	var subtitle = document.getElementById('room-subtitle');
	
	title.innerHTML = name;
	subtitle.innerHTML = myUserId;
}