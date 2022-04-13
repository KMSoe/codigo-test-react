import axiosObj from '../../axiosObj';
import * as actionTypes from './actionTypes';

export const signin = (email, password) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axiosObj.post('/login', JSON.stringify({ email, password }))
                .then(({ data }) => {
                    const user = data.data.user;
                    const token = data.data.token;

                    const tokenLife = data.data.life ? data.data.life : 1000 * 60 * 60 * 24 * 15;
                    const expirationDate = new Date(new Date().getTime() + tokenLife);
                    storeInfo(user, token, expirationDate);

                    dispatch({ type: actionTypes.SIGNIN_SUCCESS, payload: { user, authenticated: true, token } })

                    resolve(true);
                })
                .catch(({ response }) => {
                    reject(response.data);
                })
        })
    }
}

export const signout = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axiosObj.post(`/logout`, {}, { headers: { Authorization: `Bearer ${getState().auth.token}` } })
                .then((res) => {
                    dispatch({ type: actionTypes.SIGNOUT });
                    resolve(res);
                })
                .catch(({ response }) => {
                    reject(response.data);
                })
        })
    }
}

export const tryAutoSignin = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axiosObj.get(`/user`, { headers: { Authorization: `Bearer ${getState().auth.token}` } })
                .then(({ data }) => {
                    const user = data.data.user;
                    const token = getState().auth.token;

                    const expirationDate = localStorage.getItem('expirationDate');
                    const now = new Date();

                    if (now >= expirationDate) {
                        return;
                    }

                    storeInfo(user, token, expirationDate);

                    dispatch({ type: actionTypes.SIGNIN_SUCCESS, payload: { user, authenticated: true, token } })

                    resolve(true);
                })
                .catch(({ response }) => {
                    reject(response.data);
                })
        })
    }
}

function storeInfo(user, token, expirationDate) {
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
}