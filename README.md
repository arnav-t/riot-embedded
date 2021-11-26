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
Leave out `userId` and `accessToken` to attempt registration as guest.   
To set custom highlight colors, change the Sass variables `$color-highlight-custom` and `$color-txt-custom` in `styles/colors.scss` and set `highlight` to `'custom'` in the configuration. 
#### Complete list of options:
*  `baseUrl` (*string*) - Base URL of homeserver - **Required**
*  `roomId` (*string*) - The internal ID of default room - **Required** 
*  `userId` (*string*) - The ID of default user            
    Ignore to register as guest
*  `accessToken` (*string*) - Access token of default user     
    Ignore to register as guest
*  `readOnly` (*boolean*) - If the client is in read-only mode    
    - `true`
    - `false` (default)        
    Disables `msgComposer` and `roomsList` (unless overriden)
*  `theme` (*string*) - Theme of the client
    - `'dark'` - Dark theme (default)
    - `'light'` - Light theme
    - `'auto'` - Use device theme
*  `highlight` (*string*) - Highlight color  
    - `'pink'` - Pink highlights (default)  
    - `'green'` - Green highlights
    - `'custom'` - Custom highlight color
*  `roomHeader` (*boolean*) - If room header should be displayed        
    - `true` (default)
    - `false`          
*  `roomsList` (*boolean*) - If rooms list should be displayed (overrides `readOnly`)      
    - `true` (default)
    - `false`          
*  `msgComposer` (*boolean*) - If message composer should be displayed (overrides `readOnly`)          
    - `true` (default)
    - `false`          
*  `whitelist` (*Array*) - Whitelisted origins         
    Ignore to allow all origins
*  `signInPrompt` (*string*) - Show sign in prompts    
    - `'none'` - Never show (default)
    - `'guests'` - Show if signed in as guest
    - `'all'` - Always show
*  `displayName` (*string*) - Display name of user, useful when using guest accounts
*  `composerIntialValue` (*string*) - Initial value of the composer for prepoulating a sample message
*  `signInPrompt` (*string*) - Show sign in prompts    
    - `'none'` - Never show (default)
    - `'guests'` - Show if signed in as guest
    - `'all'` - Always show
*  `urlParameters` (*boolean*) - Allow adding to config with url prameters (`#displayName=Something`)    
    - `'true'` (default)
    - `'false'`