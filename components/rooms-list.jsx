import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import RoomTile from './room-tile.jsx';
import ThemeContext from './theme-context.jsx';

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

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // Construct a list of RoomTile components from list of rooms
        let rooms = [];
        for (let room of this.props.list) {
            rooms.push(
                <RoomTile key={room.roomId} room={room} 
                    selected={room.roomId === this.props.currentRoomId}
                    onClick={event => {
                        if (room.roomId !== this.props.currentRoomId) {
                            this.props.onClick(event);
                        }
                    }} />
            );
        }
        
        return (
            <div className={`bg-secondary-${theme.theme} rooms-panel scrollable-${theme.theme}`}>
                <ul className='list-panel'>
                    {rooms}
                </ul>
            </div>
        );
    }
}
