import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.jsx';

/**
 * React component for modal dialog box
 * 
 * @param   {boolean} visible - If the modal box is visible 
 * @param   {string} title - Title of the modal
 * @param   {object} children - Form body
 */
export default class Modal extends PureComponent {
    static propTypes = {
        visible: PropTypes.bool, // If modal is visible
        title: PropTypes.string, // Modal title
        children: PropTypes.object // Form body
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible // If modal is visible
        };

        this.close = this.close.bind(this);
    }

    close() {
        this.setState({
            visible: false
        });
    }

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // If hidden, return empty element
        if (!this.state.visible) return <></>;

        return (
            <div className='modal'>
                <div className={`modal-content-${theme.theme}`}>
                    <div className={`modal-topbar-${theme.highlight}`}>
                        <h3 className='modal-title'>{this.props.title}</h3>
                        <div className='cross-container' onClick={this.close}>
                            <div className={`cross-${theme.highlight}`}></div>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}