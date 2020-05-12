import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RoomsList from './rooms-list';
import TimelinePanel from './timeline-panel.jsx';
import RoomHeader from './room-header';

/** 
 * React component for the client 
 * 
 * @param   {string} roomId - The ID of default room
 * @param   {string} userId - The ID of default user
 * @param   {string} accessToken - Access token of default user
 * @param   {string} baseUrl - Base URL of homeserver
 */
export default class Client extends Component{
    static propTypes = {
        roomId: PropTypes.string.isRequired, // The ID of default room
        userId: PropTypes.string.isRequired, // The ID of default user
        accessToken: PropTypes.string.isRequired, // The access token of default user
        baseUrl: PropTypes.string.isRequired // The base URL of homeserver
    };

    constructor(props) {
        super(props);
        this.state = {
            room: null
        };
        this.sdk = require('matrix-js-sdk');
        this.client = this.sdk.createClient({
            baseUrl: props.baseUrl,
            accessToken: props.accessToken,
            userId: props.userId
        });

        this.init = this.init.bind(this);
        this.onSelectRoom = this.onSelectRoom.bind(this);

        this.init();
    }

    /** Connect client to homeserver */
    async init() {
        this.client.startClient();
        this.client.once('sync', (state) => {
            console.log(state);
            if (state === 'PREPARED') {
                this.setState({
                    room: this.client.getRoom(this.props.roomId)
                });
            }
        });
    }

    /** Handle clicks from room list */
    async onSelectRoom(e) {
        let roomId = e.currentTarget.getAttribute('id');
        this.setState({
            room: this.client.getRoom(roomId)
        });
    }

    render() {
        // Get current room ID
        let currentRoomId = this.state.room ? this.state.room.roomId : '';
        let homeserver = this.client.getHomeserverUrl();

        return (
            <div className='client darker-bg'>
                <RoomHeader homeserver={homeserver}
                    room={this.state.room} />
                
                <div className='client-body darker-bg'>
                    <RoomsList list={this.client.getRooms()} 
                        currentRoomId={currentRoomId}
                        onClick={this.onSelectRoom} />

                    <TimelinePanel homeserver={homeserver}
                        room={this.state.room} />
                </div>
            </div>
        );
    }
}
