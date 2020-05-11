/**
 * @fileoverview    React component for room header
 * 
 * @requires        NPM:react
 * @requires        NPM:prop-types
 * @requires        ./avatar.jsx
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';

/**
 * React component for the header containing room information and avatar
 * 
 * @param   {string} homeserver - Homeserver URL
 * @param   {object} room - Room object for the corresponding room
 */
class RoomHeader extends PureComponent {
    render() {
        // Get avatar URL of room
        let avatarUrl = this.props.room ? 
            this.props.room.getAvatarUrl(this.props.homeserver, 32, 32, 'scale', false) : 
            null;
        
        return (
            <div className='top-bar highlighted'>
                <Avatar imgUrl={avatarUrl} size={32} />
                <h3>{this.props.room ? this.props.room.name : ''}</h3>
            </div>
        );
    }
}

RoomHeader.propTypes = {
    homeserver: PropTypes.string.isRequired, // Homeserver URL 
    room: PropTypes.object // Room object for corresponding room    
};

export default RoomHeader;