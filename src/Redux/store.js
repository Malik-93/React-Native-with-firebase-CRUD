import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
const enhancer = compose(applyMiddleware(thunk))
import { rootReducer } from './rootRducer';
export const store = createStore(rootReducer, enhancer)