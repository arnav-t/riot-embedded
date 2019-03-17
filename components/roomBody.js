export function loadMessages(room, client) {
	var timeline = room.timeline;
	var messagesList = document.getElementById('msg-list');
	timeline.forEach(event => {
		let listItem = document.createElement('li');
		let listObj = document.createElement('div');
		listObj.id = event.event_id;
		listObj.classList.add('list-group-item');
		listObj.classList.add('bg-dark');
		listObj.classList.add('msg-body');

		let imgObj = document.createElement('img');
		imgObj.classList.add('rounded-img');
		imgObj.classList.add('mr-3');
		let sender = room.getMember(event.event['sender']);
		let imgSize = 32;
		imgObj.src = sender.getAvatarUrl(client.getHomeserverUrl(), imgSize, imgSize, 'scale');
		imgObj.height = imgSize;
		imgObj.width = imgSize;

		let msgDataObj = document.createElement('div');	
		msgDataObj.classList.add('msg-data');
		let usernameObj = document.createElement('h6');
		usernameObj.innerHTML = event.sender['name'] + ' ';
		let userIdObj = document.createElement('i');
		userIdObj.innerHTML = event.sender['userId'];
		userIdObj.classList.add('text-muted');
		usernameObj.appendChild(userIdObj);
		msgDataObj.appendChild(usernameObj);

		let messageObj = document.createElement('p');
		messageObj.innerHTML = event.event.content['body'];
		msgDataObj.appendChild(messageObj);

		listObj.appendChild(imgObj);
		listObj.appendChild(msgDataObj);
		listItem.appendChild(listObj);
		messagesList.appendChild(listItem);
	});
}

export function loadHeader(room, client) {
	var name = room.name;
	var myUserId = room.myUserId;
	var title = document.getElementById('room-title');
	var subtitle = document.getElementById('room-subtitle');
	var imgSize = 64//document.getElementById('room-header').clientHeight - 20;
	var roomAvatarImg = document.getElementById('room-avatar');
	
	roomAvatarImg.height = imgSize;
	roomAvatarImg.width = imgSize;
	roomAvatarImg.src = room.getAvatarUrl(client.getHomeserverUrl(), imgSize, imgSize, 'scale');
	
	title.innerHTML = name;
	subtitle.innerHTML = myUserId;
}