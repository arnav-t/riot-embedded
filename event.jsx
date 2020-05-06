import React, {Component} from 'react';
import Avatar from './avatar.jsx';

export default class Event extends Component {
    render() {
        return (
            <li>
                <div className='list-group-item bg-dark msg-body'>
                    <Avatar imgUrl={this.props.avatarUrl} size={32} />
                    <div className='msg-data'>
                        <h6>{this.props.username} <i className='text-muted'>{this.props.userId}</i></h6>
                        <p>
                            {this.props.msgBody}
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}