
class MessageActions {
    static ADD_MESSAGE = 'ADD_MESSAGE';
    
    static addMessage = ( message ) => {
        return {
            type: this.ADD_MESSAGE,
            payload: message
        }
    }
}

export default MessageActions