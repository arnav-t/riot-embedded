import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.jsx';
import Reply from '../res/reply.svg';
import Quote from '../res/quote.svg';
import Delete from '../res/delete.svg';

/**
 * React component for message toolbar
 * 
 * @param   {object} mxEvent - The event object
 * @param   {func} replyTo - Callback for setting reply
 * @param   {func} delete - Callback for deleting current event
 * @param   {bool} canDelete - If current user can delete this event
 */
export default class MessageToolbar extends PureComponent {
    static propTypes = {
        mxEvent: PropTypes.object.isRequired, // Event object
        replyTo: PropTypes.func.isRequired, // Callback for setting reply
        delete: PropTypes.func.isRequired, // Callback for deleting current event
        canDelete: PropTypes.bool.isRequired // If current user can delete event
    };

    constructor(props) {
        super(props);

        this.quote = this.quote.bind(this);
        this.reply = this.reply.bind(this);
    }

    /** Reply to this message */
    reply() {
        this.props.replyTo(this.props.mxEvent);
    }

    /** Quote this message */
    quote() {
        let msgComposer = document.getElementById('composer-field');
        let content = this.props.mxEvent.event.content.body;
        // Quote every line
        content = content.replace(/^/gm, '> ');
        let newMsg = `${content}\n\n${msgComposer.value}`;

        // Trigger change event
        const setValue = Object.getOwnPropertyDescriptor(msgComposer.__proto__, 'value').set;
        const event = new Event('input', { bubbles: true });
        setValue.call(msgComposer, newMsg);
        msgComposer.dispatchEvent(event);

        // Focus on msgComposer
        msgComposer.focus();
    }

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        return (
            <div className='msg-toolbar'>
                <div className={`msg-tool-${theme.theme}`} title='Reply'>
                    <Reply height={20} 
                        className={`ico-${theme.theme}`}
                        onClick={this.reply} />
                </div>
                <div className={`msg-tool-${theme.theme}`} title='Quote'>
                    <Quote height={20} 
                        className={`ico-${theme.theme}`} 
                        onClick={this.quote} />
                </div>
                {this.props.canDelete && <div className={`msg-tool-${theme.theme}`} title='Delete'>
                    <Delete height={20} 
                        className={`ico-${theme.theme}`}
                        onClick={this.props.delete} />
                </div>}
            </div>
        );
    }
}