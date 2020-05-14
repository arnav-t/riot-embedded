import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.jsx';

/**
 * React component for a single room tile in the list of rooms
 * 
 * @param   {object} room - Room object for the corresponding room
 * @param   {boolean} selected - True if current room is selected false otherwise
 * @param   {func} onClick - Callback to handle clicks
 */
export default class RoomTile extends PureComponent {
    static propTypes = {
        room: PropTypes.object.isRequired, // Room object for corresponding room
        selected: PropTypes.bool.isRequired, // True if currently selected else false
        onClick: PropTypes.func.isRequired // Callback for handling clicks
    };

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // Set appropriate class if it is selected
        let className = this.props.selected ? 
            `highlight-${theme.highlight}` : `bg-secondary-${theme.theme}`;
        
        return (
            <li className={`list-panel-item hoverable-${theme.highlight} 
                ${className}`} onClick={this.props.onClick} id={this.props.room.roomId} >
                {this.props.room.name}
            </li>
        );
    }
}
