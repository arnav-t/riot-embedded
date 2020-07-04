import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar.jsx';
import MessageToolbar from './message-toolbar.jsx';
import ThemeContext from './theme-context.jsx';
import sanitizeHtml from 'sanitize-html';

/** Sanitizer Params copied from matrix-react-sdk */
const sanitizeHtmlParams = {
    allowedTags: [
        'font', // custom to matrix for IRC-style font coloring
        'del', // for markdown
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'sup', 'sub',
        'nl', 'li', 'b', 'i', 'u', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', 'img',
    ],
    allowedAttributes: {
        // custom ones first:
        font: ['color', 'data-mx-bg-color', 'data-mx-color', 'style'], // custom to matrix
        span: ['data-mx-bg-color', 'data-mx-color', 'data-mx-spoiler', 'style'], // custom to matrix
        a: ['href', 'name', 'target', 'rel'], // remote target: custom to matrix
        img: ['src', 'width', 'height', 'alt', 'title'],
        ol: ['start'],
        code: ['class'], // We don't actually allow all classes, we filter them in transformTags
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
    // URL schemes we permit
    // allowedSchemes: PERMITTED_URL_SCHEMES,

    // allowProtocolRelative: false,
    // transformTags,
};

/**
 * React component for an event in the room timeline
 * 
 * @param   {string} homeserver - The homeserver URL
 * @param   {object} mxEvent - The event object
 * @param   {object} client - The matrix client object
 * @param   {func} replyTo - Callback for setting reply
 */
export default class EventTile extends PureComponent {
    static propTypes = {
        homeserver: PropTypes.string.isRequired, // Homeserver URL
        mxEvent: PropTypes.object.isRequired, // Event object
        client: PropTypes.object.isRequired, // Client object
        replyTo: PropTypes.func.isRequired // Callback for setting reply
    };

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
                let saneHtml = sanitizeHtml(fmtBody, sanitizeHtmlParams);
                mxBody = (
                    <span dangerouslySetInnerHTML={{ __html: saneHtml }} />
                );
            } else mxBody = this.props.mxEvent.event.content.body;
        } else return <></>; // Return empty message
        
        return (
            <li>
                <div className={`list-panel-item msg-body-${theme.theme}`}>
                    <Avatar imgUrl={avatarUrl} size={32} name={userId} />
                    <MessageToolbar mxEvent={this.props.mxEvent} replyTo={this.props.replyTo} />
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
