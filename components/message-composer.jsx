import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.jsx';

/**
 * React component for composing and sending messages
 * 
 * @param   {string} roomId - The ID of current room
 * @param   {MatrixClient} client - The client object
 * @param   {object} mxEvent - Event to reply to
 * @param   {func} unsetReply - Callback to unset reply
 */
export default class MessageComposer extends PureComponent {
    static propTypes = {
        roomId: PropTypes.string.isRequired, // Current room ID
        client: PropTypes.object.isRequired, // Client object
        mxEvent: PropTypes.object, // Event to reply to
        unsetReply: PropTypes.func.isRequired // Callback to unset reply
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            busy: false
        };

        this._msgCallback = this._msgCallback.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /** Callback for sending a message */
    _msgCallback(err) {
        if (err) {
            console.log(err);
            // TODO: Handle it by showing a prompt
        }

        // Re-enable message composer
        this.setState({
            busy: false
        });
    }

    /** Send the value in composer */
    async sendMessage() {
        if (this.state.value.length <= 0) return;

        const content = {
            msgtype: 'm.text',
            body: this.state.value
        };
        this.setState({
            value: '',
            busy: true
        });
        this.props.client.stopPeeking();
        await this.props.client.joinRoom(this.props.roomId, {syncRoom: true});
        this.props.client.sendMessage(this.props.roomId, content, 
            null, this._msgCallback);
        this.props.unsetReply();
    }

    /** Callback for updating text */
    onChange(event) {
        if (this.busy) return;

        this.setState({
            value: event.target.value
        });
    }

    /** Callback for handling special keys */
    onKeyDown(event) {
        let handled = false;
        const isMac = navigator.platform.indexOf('Mac') !== -1;

        if (event.key === 'Enter' && (event.shiftKey || (isMac && event.altKey))) {
            // Insert newline character on shift+enter
            this.setState({
                value: this.state.value + '\n'
            });
            handled = true;
        } else if (event.key === 'Enter') {
            // Send message
            this.sendMessage();
            handled = true;
        }

        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /** Callback for handling clicks on button */
    onSubmit(event) {
        // Send message
        this.sendMessage();

        event.preventDefault();
        event.stopPropagation();
    }

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        let placeholder = this.state.busy ? 'Sending...' : 'Send a message...';
        let shouldSend = this.state.value.length > 0 && !this.state.busy;

        return (
            <form className='composer-panel' onSubmit={this.onSubmit}>
                <textarea className={`msg-composer bg-primary-${theme.theme} scrollable-${theme.theme}`} 
                    value={this.state.value} onChange={this.onChange} 
                    onKeyDown={this.onKeyDown}
                    placeholder={placeholder} id='composer-field' />
                <input className={`send-button-${theme.highlight}`} type='submit' 
                    disabled={!shouldSend} value='Send' />
            </form>
        );
    }
}