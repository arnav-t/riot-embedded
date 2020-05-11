/**
 * @fileoverview    React component for the client
 * 
 * @requires        NPM:react
 * @requires        NPM:prop-types
 * @requires        ./event.jsx
 * @requires        ./room-title.jsx
 * @requires        ./top-bar.jsx
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Event from './event.jsx';
import RoomTitle from './room-title.jsx';
import TopBar from './top-bar.jsx';

/** 
 * React component for the client 
 * 
 * @param   {string} roomId - The ID of default room
 * @param   {string} userId - The ID of default user
 * @param   {string} accessToken - Access token of default user
 * @param   {string} baseUrl - Base URL of homeserver
 */
class Client extends Component{
    constructor(props) {
        super(props);
        this.state = {
            roomId: props.roomId,
            userId: props.userId,
            accessToken: props.accessToken,
            roomName: '',
            roomImgUrl: '',
            rooms: [],
            timeline: []
        };
        this.sdk = require('matrix-js-sdk');
        this.client = this.sdk.createClient({
            baseUrl: props.baseUrl,
            accessToken: props.accessToken,
            userId: props.userId
        });

        this.init = this.init.bind(this);
        this.switchRoom = this.switchRoom.bind(this);
        this.loadRooms = this.loadRooms.bind(this);
        this.populateRoom = this.populateRoom.bind(this);
        this.init();
    }

    /** Connect client to homeserver */
    init() {
        this.client.startClient();
        this.client.once('sync', (state) => {
            console.log(state);
            if (state === 'PREPARED') {
                this.loadRooms();
                this.populateRoom();
            }
        });
    }

    /** Handle clicks from room list */
    async switchRoom(e) {
        let roomId = e.currentTarget.getAttribute('id');
        this.setState({
            roomId: roomId
        });
        this.loadRooms(roomId);
        this.populateRoom(roomId);
    }
    
    /** Load list of rooms */
    async loadRooms(roomId = this.state.roomId) {
        let rooms = [];
        for (let room of this.client.getRooms()) {
            rooms.push(
                <RoomTitle key={room.roomId} roomId={room.roomId} name={room.name} selected={room.roomId === roomId} handleClick={this.switchRoom} />
            );
        }
        this.setState({
            rooms: rooms
        });
    }

    /** Load timeline for the current room */
    async populateRoom(roomId = this.state.roomId) {
        let room = await this.client.joinRoom(roomId);
        let timeline = [];
        for (let e of room.timeline) {
            let event_id = e.event.event_id;
            let sender = room.getMember(e.event.sender);
            let avatarUrl = sender.getAvatarUrl(this.client.getHomeserverUrl(), 32, 32, 'scale', false);
            let {name, userId} = e.sender;
            let msgBody = e.event.content.body;
            timeline.push(
                <Event key={event_id} avatarUrl={avatarUrl} userId={userId} username={name} msgBody={msgBody} /> 
            );
        }
        let roomImgUrl = room.getAvatarUrl(this.client.getHomeserverUrl(), 64, 64, 'scale', false);
        this.setState({
            roomImgUrl: roomImgUrl,
            roomName: room.name,
            timeline: timeline
        });
    }

    render() {
        return (
            <div className='client darker-bg'>
                <TopBar roomImg={this.state.roomImgUrl} roomName={this.state.roomName} />
                <div className='client-body darker-bg'>
                    <div className='dark-bg rooms-panel'>
                        <ul className='list-panel'>
                            {this.state.rooms}
                        </ul>
                    </div>
                    <div className='darker-bg body-panel'>
                        <ul className='list-panel'>
                            {this.state.timeline}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Client.propTypes = {
    roomId: PropTypes.string, // The ID of default room
    userId: PropTypes.string, // The ID of default user
    accessToken: PropTypes.string, // The access token of default user
    baseUrl: PropTypes.string // The base URL of homeserver
};

export default Client;