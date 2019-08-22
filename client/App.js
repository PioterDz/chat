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
        socket.on('deletemsg', ({messages}) => this.updateAfterDelete({messages}))
    }

    messageReceive(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
    }

    chatUpdate(users) {
        this.setState({users});
    }

    updateAfterDelete({messages}) {
        this.setState({messages});
    }

    handleMessageSubmit(message) {
        const messages = [message, ...this.state.messages];
        this.setState({messages});
        socket.emit('message', message);
    }

    handleUserSubmit(name) {
        this.setState({name});
        socket.emit('join', name);
    }

    deleteMessage(id, from) {
        const msgId = id;
        const userNick = from;
        const checkUser = this.state.name;
        if(userNick === checkUser) {
            const messages = this.state.messages;
            messages.splice(msgId, 1);
            this.setState({messages});
            socket.emit('delete', {messages});
        }
    }

    render() {
        return this.state.name !== '' ? (
            this.renderLayout()
        ) : this.renderUserForm()
    }
    
    renderLayout() {

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