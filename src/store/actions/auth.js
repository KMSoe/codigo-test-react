import axiosObj from '../../axiosObj';
import * as actionTypes from './actionTypes';

export const signin = (email, password) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axiosObj.post('/login', JSON.stringify({ email, password }))
                .then(({ data }) => {
                    const tokenLife = data.data.life ? data.data.life : 1000 * 60 * 60 * 24 * 15;
                    const expirationDate = new Date(new Date().getTime() + tokenLife);
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('userId', data.id);
                    localStorage.setItem('expirationDate', expirationDate);

                    dispatch({ type: actionTypes.SIGNIN_SUCCESS, payload: { user: data.data.user, authenticated: true, token: data.data.token } })

                    resolve(true);
                })
                .catch(({response}) => {
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
                .catch(err => {
                    reject(err)
                })
        })
    }
}