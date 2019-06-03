import { combineReducers } from 'redux';

import { messageReducer } from './Reducers/message-reducer';

export const rootReducer = combineReducers ({ messageReducer, })