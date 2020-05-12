import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';

/**
 * React component for an event in the room timeline
 * 
 * @param   {string} homeserver - The homeserver URL
 * @param   {object} mxEvent - The event object
 */
export default class EventTile extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL
        mxEvent: PropTypes.object.isRequired // Event object
    };

    render() {
        // Extract details from event
        let sender = this.props.mxEvent.sender;
        let avatarUrl = sender.getAvatarUrl(this.props.homeserver, 32, 32, 'scale', false);
        let {name, userId} = sender;
        let mxBody = this.props.mxEvent.event.content.body;
        
        return (
            <li>
                <div className='list-panel-item darker-bg msg-body'>
                    <Avatar imgUrl={avatarUrl} size={32} />
                    <div className='msg-data'>
                        <h4>{name} <i className='txt-muted'>{userId}</i></h4>
                        <p>
                            {mxBody}
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}
