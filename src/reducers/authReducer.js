import {USER_REGISTER, USER_LOGIN, USER_LOGOUT} from "../actions/types";

const initialState = {
    users: [],
    user: null

};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return  {
                ...state,
                user: action.payload
            }

        case USER_REGISTER:
            return  {
                ...state,
                users: [action.payload, ...state.users]
            }

        case USER_LOGOUT:
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}