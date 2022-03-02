import {combineReducers} from "redux";
import eventReducer from './eventReducer';
import userReducer from "./authReducer";
import notifyReducer from "./notifyReducer";

export default combineReducers({
    event: eventReducer,
    user: userReducer,
    notify: notifyReducer,
});