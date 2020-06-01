/**
 * Class for handling messages to and from parent frame
 * 
 * @param   {Array} origins - List of whitelisted origin domains
 */
export default class MessageInterface {
    constructor(origins=['null']) {
        this.origins = origins;

        this.onMessage = this.onMessage.bind(this);

        // Attach listener to window
        window.addEventListener('message', this.onMessage, false);
    }

    /** Callback for handling messages */
    onMessage(event) {
        // Origin of message event
        let origin = event.origin;

        // If origin is in whitelist
        if ( this.origins.includes(origin) ) {
            let data = event.data;

            // Parse data
            this.parseMessage(data);

            parent.postMessage({'status':200}, '*');
        }
    }

    /** Parse message and invoke a command */
    parseMessage(data) {
        // Tigger events
        console.log('PARSE:', data);
    }
}