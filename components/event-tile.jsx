import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';
import MessageToolbar from './message-toolbar.jsx';
import ThemeContext from './theme-context.jsx';
import Sanitizer from '../classes/sanitizer.js';
import linkifyHtml from 'linkifyjs/html';

/**
 * React component for an event in the room timeline
 * 
 * @param   {string} homeserver - The homeserver URL
 * @param   {object} mxEvent - The event object
 * @param   {object} client - The matrix client object
 * @param   {func} replyTo - Callback for setting reply
 * @param   {boolean} canWrite - If client can send messages
 * @param   {boolean} isGuest - If client is in guest mode
 * @param   {func} showReceipts - Callback to show read receipts
 */
export default class EventTile extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL
        mxEvent: PropTypes.object.isRequired, // Event object
        client: PropTypes.object.isRequired, // Client object
        replyTo: PropTypes.func.isRequired, // Callback for setting reply
        canWrite: PropTypes.bool.isRequired, // If client can send messages
        isGuest: PropTypes.bool.isRequired, // If client is in guest mode
        showReceipts: PropTypes.func.isRequired // Callback to show read receipts
    };

    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    /** Delete this event */
    delete() {
        const roomId = this.props.mxEvent.getRoomId();
        const eventId = this.props.mxEvent.event.event_id;
        this.props.client.redactEvent(roomId, eventId, (err, data) => {
            if (err) console.log(err);
            console.log(data);
        });
    }

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // Extract details from event
        let sender = this.props.mxEvent.sender;
        let avatarUrl = sender.getAvatarUrl(this.props.homeserver, 32, 32, 'scale', false);
        let {name, userId} = sender;
        let fmtBody = this.props.mxEvent.event.content.formatted_body;
        let mxBody;

        // If deleting is possible by current user
        let canDelete = this.props.client.getUserId() == userId &&
            !this.props.isGuest;

        if (this.props.mxEvent.event.content.msgtype === 'm.image') {
            // Load images
            let content = this.props.mxEvent.event.content;
            let img_url;
            if (content.info && content.info.thumbnail_url) {
                // Usual format
                img_url = this.props.client.mxcUrlToHttp(
                    content.info.thumbnail_url
                );
            } else {
                // GIFs
                img_url = this.props.client.mxcUrlToHttp(
                    content.url
                );
            }
            mxBody = (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a href={img_url} target='_blank'>
                    <img src={img_url} className={`timeline-img-${theme.highlight}`} />
                </a>
            );
        } else if (this.props.mxEvent.event.content.msgtype === 'm.text') {
            // Load text only messages
            if (fmtBody) {
                let saneHtml = new Sanitizer(fmtBody).sanitize();
                saneHtml = linkifyHtml(saneHtml, {
                    defaultProtocol: 'https',
                    ignoreTags: ['a', 'blockquote']
                });
                mxBody = (
                    <span dangerouslySetInnerHTML={{ __html: saneHtml }} />
                );
            } else mxBody = this.props.mxEvent.event.content.body;
        } else return <></>; // Return empty message
        
        return (
            <li>
                <div className={`list-panel-item msg-body-${theme.theme}`}>
                    <Avatar imgUrl={avatarUrl} size={32} name={userId} />
                    <MessageToolbar 
                        mxEvent={this.props.mxEvent} 
                        replyTo={this.props.replyTo} 
                        delete={this.delete}
                        canDelete={canDelete}
                        canWrite={this.props.canWrite}
                        showReceipts={this.props.showReceipts} />
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
