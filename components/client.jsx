/**
 * @fileoverview    React component for the client
 * 
 * @requires        NPM:react
 * @requires        ./event-timeline.jsx
 */

import React, {Component} from 'react';
import EventTimeline from './event-timeline.jsx';

/** 
 * React component for the client 
 * 
 * @param   {string} roomId - The ID of default room
 * @param   {string} userId - The ID of default user
 * @param   {string} accessToken - Access token of default user
 * @param   {string} baseUrl - Base URL of homeserver
 */
export default class Client extends Component{
    constructor(props) {
        super(props);
        this.state = {
            roomId: props.roomId,
            userId: props.userId,
            accessToken: props.accessToken,
            timeline: []
        };
        this.sdk = require('matrix-js-sdk');
        this.client = this.sdk.createClient({
            baseUrl: props.baseUrl,
            accessToken: props.accessToken,
            userId: props.userId
        });

        this.init = this.init.bind(this);
        this.loadRooms = this.loadRooms.bind(this);
        this.populateRoom = this.populateRoom.bind(this);
        this.init();
    }

    /** Connect client to homeserver */
    init() {
        this.client.startClient();
        this.client.once('sync', (state, prevState, res) => {
            console.log(state);
            if (state === 'PREPARED') {
                this.loadRooms();
                this.populateRoom();
            }
        });
    }
    
    /** Load list of rooms */
    async loadRooms() {
        /* for (let room of this.client.getRooms()) {
            appendRoom(room.name, room.roomId, this.state.roomId, this.client)
        } */
    }
    /** Load timeline for the current room */
    async populateRoom() {
        let room = await this.client.joinRoom(this.state.roomId);
        let timeline = []
        for (let e of room.timeline) {
            let timelineEvent = {};
            timelineEvent.event_id = e.event.event_id;
            let sender = room.getMember(e.event.sender);
            timelineEvent.avatarUrl = sender.getAvatarUrl(this.client.getHomeserverUrl(), 32, 32, 'scale', false);
            timelineEvent.username = e.sender.name;
            timelineEvent.userId = e.sender.userId;
            timelineEvent.msgBody = e.event.content.body;
            timeline.push(timelineEvent);
        }
        this.setState({
            timeline: timeline
        });
    }

    render() {
        return (
            <div>
                <div className='border'></div>
                <div className='card border-left'>
                    <EventTimeline timeline={this.state.timeline} />
                </div>
            </div>
        );
    }
}