import React from 'react';

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
                id={i}
                />
            );
            })
        }
    </div>
);

const Message = props => (
    <div className={styles.Message}>
        <div className={styles.TextContent}>
            <strong>{props.from} :</strong>
            <span>{props.text}</span>
        </div>
        <div className={styles.TextInfo}>
            <p>{props.time}</p>
            <span id={props.id} from={props.from} className={styles.DeleteButton} onClick={props.clickDel}>X</span>
        </div>
    </div>
);

export default MessageList;