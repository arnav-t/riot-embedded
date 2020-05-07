/**
 * @fileoverview    React component for event timeline of a room
 * 
 * @requires        NPM:react
 * @requires        ./event.jsx
 */

import React, {Component} from 'react';
import Event from './event.jsx';

/** 
 * React component for the event timeline of a room 
 * 
 * @param   {Array} timeline - An array of objects of each object containing
 *                             event_id, username, userId, avatarUrl, msgBody 
 *                             of the event
 */
export default class EventTimeline extends Component {
    /*constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.events === undefined) return;
        if (JSON.stringify(prevProps.events) !== JSON.stringify(this.state.events)) {
            console.log(JSON.stringify(prevProps.events) + ' --- ' + JSON.stringify(this.state.events));
            let events = [];
            for (let e of this.props.timeline) {
                events.push(
                    <Event key={e.event_id} username={e.username} 
                    userId={e.userId} avatarUrl={e.avatarUrl} msgBody={e.msgBody} /> 
                );
            }
            this.setState({
                events: events
            });
        }
    }*/
    render() {
        let events = [];
        for (let e of this.props.timeline) {
            events.push(
                <Event key={e.event_id} username={e.username} 
                userId={e.userId} avatarUrl={e.avatarUrl} msgBody={e.msgBody} /> 
            );
        }
        return (
            <ul className='list-group'>
                {events}
            </ul>
        );
    }
}