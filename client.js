import React, {Component} from 'react';
import {roomsList, appendRoom, selectRoom} from './components/roomsList';

export default class Client extends Component{
    constructor(config) {
        super();
        this.state = config;
        this.sdk = require('matrix-js-sdk');
        this.client = this.sdk.createClient(config);
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
        for (let room of this.client.getRooms()) {
            appendRoom(room.name, room.roomId, this.state.roomId, this.client)
        }
    }
    async populateRoom() {
        let room = await this.client.joinRoom(this.state.roomId);
        selectRoom(this.state.roomId, this.client);
    }
}