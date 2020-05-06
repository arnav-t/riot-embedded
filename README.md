# riot-embedded
Embedded version of Riot. Currently work in progress. 
## Development workflow
`webpack-dev-server` is used to deploy the app on port 9000.
```
npm install
npm run dev
npm start
```
Create `config.js` in the root directory of the repository with the following format.
```js
export let config = {
	baseUrl: "<BASE URL>",
	roomId: "<DEFAULT ROOM ID>",
	userId: "<DEFAULT USER ID>",
	accessToken: "<DEFAULT ACCESS TOKEN>"
}
```