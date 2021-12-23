import axios from './utils/client.js';
import { LoginFailure, LoginStart, LoginSuccess } from "./context/AuthActions"

export const loginCall = async (userCredential, dispatch) => {
    dispatch((LoginStart))
    try {
        const res = await axios.post("auth/login", userCredential)
        dispatch(LoginSuccess(res.data))
    }

    catch (err) {
        dispatch(LoginFailure(err))
    }
}