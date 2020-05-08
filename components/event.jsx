/**
 * @fileoverview    React component for a timeline event
 * 
 * @requires        NPM:react
 * @requires        ./avatar.jsx
 */


import React, {Component} from 'react';
import Avatar from './avatar.jsx';

/** 
 * React component for a timeline event
 * 
 * @param   {string} avatarUrl - The avatar URL of the event sender
 * @param   {string} userId - The ID of sender
 * @param   {string} username - The username of sender
 * @param   {string} msgBody - The body of message
 */
export default class Event extends Component {
    render() {
        return (
            <li>
                <div className='list-panel-item darker-bg msg-body'>
                    <Avatar imgUrl={this.props.avatarUrl} size={32} />
                    <div className='msg-data'>
                        <h4>{this.props.username} <i className='txt-muted'>{this.props.userId}</i></h4>
                        <p>
                            {this.props.msgBody}
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}