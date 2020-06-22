import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';
import ThemeContext from './theme-context.jsx';

/**
 * React component for an event in the room timeline
 * 
 * @param   {string} homeserver - The homeserver URL
 * @param   {object} mxEvent - The event object
 * @param   {object} client - The matrix client object
 */
export default class EventTile extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL
        mxEvent: PropTypes.object.isRequired, // Event object
        client: PropTypes.object.isRequired // Client object
    };

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // Extract details from event
        let sender = this.props.mxEvent.sender;
        let avatarUrl = sender.getAvatarUrl(this.props.homeserver, 32, 32, 'scale', false);
        let {name, userId} = sender;
        let mxBody;

        if (this.props.mxEvent.event.content.msgtype === 'm.image') {
            // Load images
            let content = this.props.mxEvent.event.content;
            let img_url = this.props.client.mxcUrlToHttp(
                content.info.thumbnail_url
            );
            mxBody = (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a href={img_url} target='_blank'>
                    <img src={img_url} className={`timeline-img-${theme.highlight}`} />
                </a>
            );
        } else if (this.props.mxEvent.event.content.msgtype === 'm.text') {
            // Load text only messages
            mxBody = this.props.mxEvent.event.content.body;
        } else return <></>; // Return empty message
        
        return (
            <li>
                <div className={`list-panel-item bg-primary-${theme.theme} msg-body`}>
                    <Avatar imgUrl={avatarUrl} size={32} name={name} />
                    <div className='msg-data'>
                        <h4>{name} <i className='text-muted'>{userId}</i></h4>
                        <p>
                            {mxBody}
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}
