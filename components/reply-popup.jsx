import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';
import ThemeContext from './theme-context.jsx';
import Sanitizer from '../classes/sanitizer.js';

/**
 * React component for an reply popup
 * 
 * @param   {string} homeserver - The homeserver URL
 * @param   {object} mxEvent - The event object
 * @param   {object} client - The matrix client object
 * @param   {func} replyTo - Callback for setting reply
 */
export default class ReplyPopup extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL
        mxEvent: PropTypes.object.isRequired, // Event object
        client: PropTypes.object.isRequired, // Client object
        replyTo: PropTypes.func.isRequired // Callback for setting reply
    };

    constructor(props) {
        super(props);

        this.unsetReply = this.unsetReply.bind(this);
    }

    unsetReply() {
        this.props.replyTo();
    }

    // Consume theme context
    static contextType = ThemeContext;
    render() {
        let theme = this.context;

        // Extract details from event
        let sender = this.props.mxEvent.sender;
        let avatarUrl = sender.getAvatarUrl(this.props.homeserver, 32, 32, 'scale', false);
        let {name, userId} = sender;
        let fmtBody = this.props.mxEvent.event.content.format == 'org.matrix.custom.html'
            && this.props.mxEvent.event.content.formatted_body ? this.props.mxEvent.event.content.formatted_body : null;
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
            if (fmtBody) {
                let saneHtml = new Sanitizer(fmtBody).sanitize();
                mxBody = (
                    <span dangerouslySetInnerHTML={{ __html: saneHtml }} />
                );
            } else mxBody = this.props.mxEvent.event.content.body;
        } else return <></>; // Return empty message
        
        if (this.props.mxEvent == null) return <></>;

        return (
            <div className='reply-popup'>
                <div className={`list-panel-item msg-body bg-primary-${theme.theme}`}>
                    <Avatar imgUrl={avatarUrl} size={32} name={userId} />
                    <div className='msg-data'>
                        <h4>{name} <i className='text-muted'>{userId}</i></h4>
                        <p>
                            {mxBody}
                        </p>
                    </div>
                </div>
                <div className='cross-container' onClick={this.unsetReply}>
                    <div className={'cross'}></div>
                </div>
            </div>
        );
    }
}
