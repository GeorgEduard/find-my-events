import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import {saveState, loadState} from "./helpers/localStorage";
import throttle from 'lodash.throttle';

const middleware =  [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    enhancer: composeWithDevTools(applyMiddleware(...middleware)),
    preloadedState: loadState()
})

store.subscribe(
    throttle( () => saveState(store.getState()), 1000)
);

export default  store;



