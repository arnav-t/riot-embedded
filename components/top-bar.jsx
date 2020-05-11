/**
 * @fileoverview    React component for top bar displaying room info
 * 
 * @requires        NPM:react
 * @requires        NPM:prop-types
 * @requires        ./avatar.jsx
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';

/**
 * React component for displaying room avatar and name
 * 
 * @param   {string} roomImg - URL for room avatar
 * @param   {string} roomName - Name of the room 
 */
class TopBar extends Component {
    render() {
        return (
            <div className='top-bar highlighted'>
                <Avatar imgUrl={this.props.roomImg} size={32} />
                <h3>{this.props.roomName}</h3>
            </div>
        );
    }
}

TopBar.propTypes = {
    roomImg: PropTypes.string, // URL for room avatar
    roomName: PropTypes.string // Name of the room
};

export default TopBar;