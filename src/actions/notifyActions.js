import {NOTIFY_USER} from "./types";
import axios from "axios";

export const notifyUser = (message, messageType) => {
    return {
        type: NOTIFY_USER,
        message,
        messageType
    }
}

