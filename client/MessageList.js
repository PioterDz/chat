import React, { Component } from 'react';

import styles from './MessageList.css';

const MessageList = props => (
    <div className={styles.MessageList}>
        {
            props.messages.map((message, i) => {
            return (
                <Message
                key={i}
                from={message.from}
                text={message.text}
                time={message.date}
                clickDel={props.deleteMsg}
                name={props.name}
                id={i}
                />
            );
            })
        }
    </div>
);


class Message extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        this.props.clickDel(this.props.id, this.props.from);
    }

    render() {
        return(
            <div className={styles.Message}>
                <div className={styles.TextContent}>
                    <strong>{this.props.from} :</strong>
                    <span>{this.props.text}</span>
                </div>
                <div className={styles.TextInfo}>
                    <p>{this.props.time}</p>
                    <span className={this.props.from === this.props.name ? styles.DeleteButton : styles.NoDisplay} onClick={this.handleDelete}>X</span>
                </div>
            </div>
        );
    }
}

export default MessageList;