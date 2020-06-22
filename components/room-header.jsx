import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';
import ThemeContext from './theme-context.jsx';

/**
 * React component for the header containing room information and avatar
 * 
 * @param   {string} homeserver - Homeserver URL
 * @param   {object} room - Room object for the corresponding room
 */
export default class RoomHeader extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL 
        room: PropTypes.object // Room object for corresponding room    
    };

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // Get avatar URL of room
        let avatarUrl = this.props.room ? 
            this.props.room.getAvatarUrl(this.props.homeserver, 32, 32, 'scale', false) : 
            null;
        
        let roomName = this.props.room ? this.props.room.name : '';

        return (
            <div className={`top-bar highlight-${theme.highlight}`}>
                <Avatar imgUrl={avatarUrl} size={32} name={roomName} />
                <h3>{roomName}</h3>
            </div>
        );
    }
}
