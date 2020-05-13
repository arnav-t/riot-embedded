import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import EventTile from './event-tile.jsx';

/**
 * React component for the room timeline
 * 
 * @param   {string} homeserver - The homeserver URL
 * @param   {object} room - The room object
 * @param   {Array<Object>} children - Children of room timeline
 */
export default class TimelinePanel extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL
        room: PropTypes.object, // Room object
        children: PropTypes.arrayOf(PropTypes.object) // Children of timeline
    };

    render() {
        // Construct timeline from room
        let timeline = [];
        if (this.props.room) {
            for (let event of this.props.room.timeline) {
                timeline.push(
                    <EventTile key={event.event.event_id} 
                        homeserver={this.props.homeserver}
                        mxEvent={event} />
                ); 
            }
        }
        
        return (
            <div className='main-body'>
                <div className='darker-bg body-panel scrollable'>
                    <ul className='list-panel'>
                        {timeline}
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}
