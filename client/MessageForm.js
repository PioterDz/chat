import React, {Component} from 'react';
import styles from './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            date: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const message = {
        from : this.props.name,
        text : this.state.text,
        date: this.state.date
        };
        this.props.onMessageSubmit(message);
        this.setState({ text: '', date: '' });
    }

    changeHandler(e) {

        function addZero(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
        }

        const now = new Date();
        const hours = addZero(now.getHours());
        const minutes = addZero(now.getMinutes());
        const seconds = addZero(now.getSeconds());
        const time = hours + ":" + minutes + ":" + seconds;

        this.setState({ 
            text : e.target.value,
            date: time
        });
    }

    render() {
        return(
        <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
            <input
            className={styles.MessageInput}
            onChange={e => this.changeHandler(e)}
            value={this.state.text}
            placeholder='Message'
            />
        </form>
        );
    }
}

export default MessageForm;