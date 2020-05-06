import {roomsList, appendRoom, selectRoom} from './components/roomsList';

export default class Client {
    constructor(config) {
        this.config = config;
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
            if (room !== undefined) appendRoom(room.name, room.roomId, this.config.roomId, this.client)
        }
    }
    async populateRoom() {
        let room = await this.client.joinRoom(this.config.roomId);
        selectRoom(this.config.roomId, this.client);
    }
}