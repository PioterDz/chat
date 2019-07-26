import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [], messages: [], text: '', name: ''};
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceive(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
    }

    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
        console.log(this.state.messages, 'msg receive');
    }

    chatUpdate(users) {
        this.setState({users});
    }

    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
        console.log(this.state.messages, 'msg state');
        socket.emit('message', message);
    }

    handleUserSubmit(name) {
        this.setState({name});
        socket.emit('join', name);
    }

    deleteMessage(e) {
        const msgId = e.target.id;
        const userNick = e.target.from;
        const checkUser = e.target.name;
        console.log(userNick, checkUser, 'check del');
        if(userNick === checkUser) {
            const actuallMessages = this.state.messages;
            actuallMessages.splice(msgId, 1);
            this.setState({messages: actuallMessages});
        }
    }

    render() {
        return this.state.name !== '' ? (
            this.renderLayout()
        ) : this.renderUserForm()
    }
    
    renderLayout() {
        console.log(this.state, 'STATE');
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        App room
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList
                        users={this.state.users}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                        messages={this.state.messages}
                        deleteMsg={this.deleteMessage}
                        name={this.state.name}
                        />
                        <MessageForm
                        onMessageSubmit={message => this.handleMessageSubmit(message)}
                        name={this.state.name}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
     }
};

export default hot(module)(App);