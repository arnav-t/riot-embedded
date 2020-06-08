import EventEmitter from 'events';

/**
 * Class for handling messages to and from parent frame
 * 
 * @param   {Array} origins - List of whitelisted origin domains
 */
export default class MessageHandler extends EventEmitter{
    constructor(origins=['null']) {
        super();
        this.origins = origins;

        this.onMessage = this.onMessage.bind(this);

        // Attach listener to window
        window.addEventListener('message', this.onMessage, false);
    }

    /** Callback for handling messages */
    onMessage(event) {
        // Origin of message event
        let origin = event.origin;

        if (!origin) {
            // Chrome fix
            origin = event.originalEvent.origin;
        }

        // If origin is in whitelist
        if ( this.origins.includes(origin) ) {
            let data = event.data;

            // Parse data
            this.parseMessage(data);
        }
    }

    /** Parse message and invoke a command */
    parseMessage(data) {
        // Check if data is an object
        if (typeof data !== 'object') {
            parent.postMessage({
                'status' : 'error',
                'message' : 'Invalid message format.'
            }, '*');
            return;
        }

        let cmd = data.cmd;
        if (typeof cmd !== 'string') {
            parent.postMessage({
                'status' : 'error',
                'message' : 'Invalid or missing command.'
            }, '*');
            return;
        }

        // Invoke command
        let args = data.args;
        switch(cmd) {
        case 'setTheme':
            // Change theme
            if (typeof args !== 'object') {
                parent.postMessage({
                    'status' : 'error',
                    'message' : 'Invalid or missing arguments.'
                }, '*');
                return;
            }
            this.emit('setTheme', args);
            parent.postMessage({
                'status' : 'success',
                'message' : 'Theme set.'
            }, '*');
            break;

        case 'roomHeader':
            // Toggle room header
            if (typeof args !== 'boolean') {
                parent.postMessage({
                    'status' : 'error',
                    'message' : 'Invalid or missing arguments.'
                }, '*');
                return;
            }
            this.emit('roomHeader', args);
            parent.postMessage({
                'status' : 'success',
                'message' : 'Toggled room header.'
            }, '*');
            break;

        case 'roomsList':
            // Toggle rooms list
            if (typeof args !== 'boolean') {
                parent.postMessage({
                    'status' : 'error',
                    'message' : 'Invalid or missing arguments.'
                }, '*');
                return;
            }
            this.emit('roomsList', args);
            parent.postMessage({
                'status' : 'success',
                'message' : 'Toggled rooms list.'
            }, '*');
            break;

        default:
            // No matching command
            parent.postMessage({
                'status' : 'error',
                'message' : 'Invalid command.'
            }, '*');
            return;
        }
    }
}