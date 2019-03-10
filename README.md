# riot-embedded
Embedded version of Riot. Currently work in progress. 
## Development workflow
`webpack-dev-server` is used to deploy the app on port 9000.
```
npm install
npm run build
npm start
```
Create `creds.js` in the root directory of the repository with the following format.
```
const myUserId = "<USER ID>";
const myAccessToken = "<ACCESS TOKEN>";

export {myUserId, myAccessToken};
```