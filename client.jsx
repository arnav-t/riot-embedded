import React, {Component} from 'react';
import EventTimeline from './eventTimeline.jsx';

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
        this.init();

        this.init = this.init.bind(this);
        this.loadRooms = this.loadRooms.bind(this);
        this.populateRoom = this.populateRoom.bind(this);
    }
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
    loadRooms() {
        /* for (let room of this.client.getRooms()) {
            appendRoom(room.name, room.roomId, this.state.roomId, this.client)
        } */
    }
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