import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.jsx';

/**
 * React component for message toolbar
 */
export default class MessageToolbar extends PureComponent {
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
                        className={`ico-${theme.theme}`} />
                </div>
            </div>
        );
    }
}