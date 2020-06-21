import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RoomsList from './rooms-list';
import TimelinePanel from './timeline-panel.jsx';
import RoomHeader from './room-header';
import MessageComposer from './message-composer';
import ThemeContext from './theme-context.jsx';
import Modal from './modal';
import SignInForm from './sign-in-form';
import MessageHandler from '../classes/message-handler.js';

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
            room: null,
            theme: 'dark',  // Client theme (dark/light)
            highlight: 'pink',   // Client theme highlight (pink/green)
            roomHeader: true,   // If room header should be displayed
            roomsList: true,    // If rooms list should be displayed
            msgComposer: true,  // If message composer should be displayed
        };
        this.sdk = require('matrix-js-sdk');
        this.client = this.sdk.createClient({
            baseUrl: props.baseUrl,
            accessToken: props.accessToken,
            userId: props.userId
        });
        // TODO: Load from whitelist from config
        this.messageHandler = new MessageHandler();

        this.init = this.init.bind(this);
        this.onSelectRoom = this.onSelectRoom.bind(this);
        this._onRoomTimeline = this._onRoomTimeline.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.toggleRoomHeader = this.toggleRoomHeader.bind(this);
        this.toggleRoomsList = this.toggleRoomsList.bind(this);
        this.toggleMsgComposer = this.toggleMsgComposer.bind(this);
        this.setUser = this.setUser.bind(this);

        // Consume events from MessageHandler
        this.messageHandler.on('setTheme', this.setTheme);
        this.messageHandler.on('roomHeader', this.toggleRoomHeader);
        this.messageHandler.on('roomsList', this.toggleRoomsList);
        this.messageHandler.on('msgComposer', this.toggleMsgComposer);

        this.init();
    }

    /** Listener for timeline events */
    _onRoomTimeline(event, room) {
        if (room === this.state.room) {
            // If event is from current room, update
            this.setState({
                room: room
            });
        }
    }

    /** Connect client to homeserver */
    async init(callback=null) {
        this.client.startClient();
        this.client.once('sync', (state) => {
            console.log(state);
            if (state === 'PREPARED') {
                this.setState({
                    room: this.client.getRoom(this.props.roomId)
                });

                if (callback) callback();

                // Add listeners
                this.client.on('Room.timeline', this._onRoomTimeline);
            }
        });
    }

    /** Handle clicks from room list */
    onSelectRoom(e) {
        let roomId = e.currentTarget.getAttribute('id');
        this.setState({
            room: this.client.getRoom(roomId)
        });
    }

    setUser(userId, accessToken, callback=null) {
        this.client = this.sdk.createClient({
            baseUrl: this.props.baseUrl,
            accessToken: accessToken,
            userId: userId
        });

        this.init(callback);
    }

    /** Consume setTheme event from MessageHandler */
    setTheme(args) {
        this.setState({
            theme: args.theme ? args.theme : this.state.theme,
            highlight: args.highlight ? args.highlight : this.state.highlight
        });
    }

    /** Consume roomHeader event from MessageHandler */
    toggleRoomHeader(args) {
        this.setState({
            roomHeader: args
        });
    }

    /** Consume roomsList event from MessageHandler */
    toggleRoomsList(args) {
        this.setState({
            roomsList: args
        });
    }

    /** Consume msgComposer event from MessageHandler */
    toggleMsgComposer(args) {
        this.setState({
            msgComposer: args
        });
    }

    render() {
        // Get current room ID
        let currentRoomId = this.state.room ? this.state.room.roomId : '';
        let homeserver = this.client.getHomeserverUrl();

        return (
            <ThemeContext.Provider value={{theme: this.state.theme, highlight: this.state.highlight}}>
                <div className={`client bg-primary-${this.state.theme}`}>
                    <Modal visible={true} title='Sign in'>
                        <SignInForm client={this.client} setUser={this.setUser} />
                    </Modal>

                    {this.state.roomHeader && (<RoomHeader homeserver={homeserver}
                        room={this.state.room} />)}              
                    
                    <div className={`client-body bg-primary-${this.state.theme}`}>
                        {this.state.roomsList && (<RoomsList list={this.client.getRooms()} 
                            currentRoomId={currentRoomId}
                            onClick={this.onSelectRoom} />)}
                        <TimelinePanel homeserver={homeserver}
                            room={this.state.room} client={this.client} > 
                            {this.state.msgComposer ? <MessageComposer client={this.client} 
                                roomId={currentRoomId} /> : <></>}
                            
                        </TimelinePanel>
                    </div>
                </div>
            </ThemeContext.Provider>
        );
    }
}
