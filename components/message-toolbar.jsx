import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.jsx';

/**
 * React component for message toolbar
 * 
 * @param   {object} mxEvent - The event object
 */
export default class MessageToolbar extends PureComponent {
    static propTypes = {
        mxEvent: PropTypes.object.isRequired // Event object
    };

    constructor(props) {
        super(props);

        this.quote = this.quote.bind(this);
    }
    
    quote() {
        let msgComposer = document.getElementById('composer-field');
        let content = this.props.mxEvent.event.content.body;
        let newMsg = `> ${content}\n\n${msgComposer.value}`;

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
                <div className={`msg-tool-${theme.theme}`}>
                    <img src='../res/reply.svg' height={20} 
                        className={`ico-${theme.theme}`} />
                </div>
                <div className={`msg-tool-${theme.theme}`}>
                    <img src='../res/quote.svg' height={20} 
                        className={`ico-${theme.theme}`} 
                        onClick={this.quote} />
                </div>
            </div>
        );
    }
}