/**
 * @fileoverview    React component for room tile
 * 
 * @requires        NPM:react
 * @requires        NPM:prop-types
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/**
 * React component for a single room tile in the list of rooms
 * 
 * @param   {object} room - Room object for the corresponding room
 * @param   {boolean} selected - True if current room is selected false otherwise
 * @param   {func} onClick - Callback to handle clicks
 */
class RoomTile extends PureComponent {
    render() {
        // Set appropriate class if it is selected
        let className = this.props.selected ? 'highlighted' : 'dark-bg';
        
        return (
            <li className={`list-panel-item hoverable 
                ${className}`} onClick={this.props.onClick} id={this.props.room.roomId} >
                {this.props.room.name}
            </li>
        );
    }
}

RoomTile.propTypes = {
    room: PropTypes.object.isRequired, // Room object for corresponding room
    selected: PropTypes.bool.isRequired, // True if currently selected else false
    onClick: PropTypes.func.isRequired // Callback for handling clicks
};

export default RoomTile;