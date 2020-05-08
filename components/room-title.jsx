/**
 * @fileoverview    React component for item in room list
 * 
 * @requires        NPM:react
 */

import React, {Component} from 'react';

/**
 * React component for title in list of rooms
 * 
 * @param   {string} name - The name of the room
 * @param   {string} roomId - The ID of the room
 * @param   {boolean} selected - If the room is selected
 * @param   {Object} handleClick - Function to handle clicks
 */
export default class RoomTitle extends Component {
    render() {
        return (
            <li className={`list-panel-item hoverable 
                ${this.props.selected ? 'highlighted' : 'dark-bg'}`}
                onClick={this.props.handleClick} id={this.props.roomId} >
                {this.props.name}
            </li>
        );
    }
}