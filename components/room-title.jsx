/**
 * @fileoverview    React component for item in room list
 * 
 * @requires        NPM:react
 * @requires        NPM:prop-types
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * React component for title in list of rooms
 * 
 * @param   {string} name - The name of the room
 * @param   {string} roomId - The ID of the room
 * @param   {boolean} selected - If the room is selected
 * @param   {Object} handleClick - Callback to handle clicks
 */
class RoomTitle extends Component {
    render() {
        return (
            <li className={`list-panel-item hoverable 
                ${this.props.selected ? 'highlighted' : 'dark-bg'}`} onClick={this.props.handleClick} id={this.props.roomId} >
                {this.props.name}
            </li>
        );
    }
}

RoomTitle.propTypes = {
    name: PropTypes.string, // The name of the room
    roomId: PropTypes.string, // The ID of the room
    selected: PropTypes.bool, // true if the room is selected, false otherwise
    handleClick: PropTypes.func, // Callback to handle clicks
};

export default RoomTitle;