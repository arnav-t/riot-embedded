const express = require('express');
const sdk = require('matrix-js-sdk');

const port = 8000;
var client = sdk.createClient("https://matrix.org");
const app = express();


app.get('/', function(req, res) {
	console.log('Get /');
	client.publicRooms(function(err, data) {
		let rstr = ''; 
		for(var room in data['chunk']) {
			rstr += data['chunk'][room]['canonical_alias'] + '<br>';
		}
		res.send(rstr);
	});
});

app.listen(port, function() { 
	console.log(`Riot embedded client running on ${port}!`);
});