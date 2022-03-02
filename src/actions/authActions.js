import {USER_REGISTER, USER_LOGIN, USER_LOGOUT} from "./types";
import axios from "axios";

export const userRegister = user => async dispatch => {
    const res = await axios.post('http://localhost:3004/users', user);

    dispatch({
        type: USER_REGISTER,
        payload: res.data
    });
}


export const getUsers = (user) => async dispatch => {
    const res = await axios.get(`http://localhost:3004/users/`, user);

    dispatch({
        type: USER_LOGIN,
        payload: res.data
    })
}

export const tryLogin = (email, password) => async dispatch => {
    const res = await axios.get(`http://localhost:3004/users/`);
    const userData = res.data.find(user => user.email === email && user.password === password);

    if (userData !== undefined) {
        dispatch({
            type: USER_LOGIN,
            payload: userData
        })
    }
    return userData;
}

export const userLogout = user => async  dispatch => {
    dispatch( {
        type: USER_LOGOUT
    })
}