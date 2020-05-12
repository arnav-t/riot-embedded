import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import RoomTile from './room-tile.jsx';

/**
 * React component for list of rooms
 * 
 * @param   {Array<Room>} list - List of room objects
 * @param   {string} currentRoomId - The currently selected roomId
 * @param   {func} onClick - Callback for onclick events
 */
export default class RoomsList extends PureComponent {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.object).isRequired, // List of rooms
        currentRoomId: PropTypes.string.isRequired, // Currently selected room ID
        onClick: PropTypes.func // Callback for onclick events
    };

    render() {
        // Construct a list of RoomTile components from list of rooms
        let rooms = [];
        for (let room of this.props.list) {
            rooms.push(
                <RoomTile key={room.roomId} room={room} 
                    selected={room.roomId === this.props.currentRoomId}
                    onClick={this.props.onClick} />
            );
        }
        
        return (
            <div className='dark-bg rooms-panel'>
                <ul className='list-panel'>
                    {rooms}
                </ul>
            </div>
        );
    }
}
