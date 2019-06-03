import messageActions from '../Actions/message-actions'

const initialState = {
    messageList: [
        { name: '', message: ''}
    ]
}
export const messageReducer = ( state = initialState, action ) => {

    switch (action.type) {
    case messageActions.ADD_MESSAGE:
        return { ...state, messagesList: action.payload }

        default:
        return state
}
}