# Documentation
This is a version of the Matrix client intended to be embedded within iframes of variable sizes on a webpage.   
## Features
Currently, the client supports:   
* List of joined rooms that can be selected 
* Live room timeline events
* Support for image based messages     
* Message composer and ability to send messages to a room
* Dark and light themes for the client
* Changeable highlight colors
* Toggleable room header and room timeline components
* `postMessage` interface for sending commands from the parent window    
* Support for guest mode

More features to be added soon.
## Usage
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
### Using the `postMessage` interface
All messages will follow this format
```js
{
    cmd: 'Some command',
    args: 'Arguments'
}
```
#### Change theme or highlight color
```js
iframe.contentWindow.postMessage({
    cmd: 'setTheme',
    args: {
        theme: 'light',
        highlight:, 'green'
    }
}, origin);
```
*Arguments:*

`args` (object):   
* `theme` (string) - `'dark'` or `'light'`
* `highlight` (string) - highlight color such as `'pink'` or `'green'`   

*Response:*
```js
{
    status: 'success', 
    message: 'Theme set.'
}
```
#### Toggle `roomHeader`
```js
iframe.contentWindow.postMessage({
    cmd: 'roomHeader',
    args: false
}, origin);
```
*Arguments:*

`args` (boolean) -  
`false` for hidden, `true` for visible  

*Response:*
```js
{
    status: 'success', 
    message: 'Toggled room header.'
}
```
#### Toggle `roomsList`
```js
iframe.contentWindow.postMessage({
    cmd: 'roomsList',
    args: false
}, origin);
```
*Arguments:*

`args` (boolean) -  
`false` for hidden, `true` for visible  

*Response:*
```js
{
    status: 'success', 
    message: 'Toggled rooms list.'
}
```
#### Toggle `messageComposer`
```js
iframe.contentWindow.postMessage({
    cmd: 'msgComposer',
    args: false
}, origin);
```
*Arguments:*

`args` (boolean) -  
`false` for hidden, `true` for visible  

*Response:*
```js
{
    status: 'success', 
    message: 'Toggled message composer.'
}
```
### Login with username and password
```js
iframe.contentWindow.postMessage({
    cmd: 'login',
    args: {
        user: 'username',
        passwd: 'password'
    }
}, origin);
```
*Arguments:*

`args` (object):   
* `username` (string) - Username
* `passwd` (string) - Password   

*Response:*
```js
{
    status: 'success', 
    message: 'Attempting sign in...'
}
```