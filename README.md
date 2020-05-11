# riot-embedded
Embedded version of Riot. Currently work in progress. 
## Development workflow   
### Installing dependencies
```
npm install
```
### Creating a bundle
#### For development:
```
npm run dev
```
#### For production:
```
npm run build
```
### Deploying to `webpack-dev-server` with hot reloading enabled (deployed on port 9000)
```
npm start
```
### Running the linter
```
npm run lint
```
### Configuration
Create `config.js` in the root directory of the repository with the following format.
```js
export let config = {
    baseUrl: '<BASE URL>',
    roomId: '<DEFAULT ROOM ID>',
    userId: '<DEFAULT USER ID>',
    accessToken: '<DEFAULT ACCESS TOKEN>'
};
```