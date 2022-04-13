import axiosObj from '../../axiosObj';
import * as actionTypes from './actionTypes';

export const signin = ({email, password}) => {
    return dispatch => {
        return axiosObj.post('/login', JSON.stringify({ email, password }))
            .then(res => {
                
            })
            .catch(err => {
                
            })
    }
}

export const logout = (token) => {
    return dispatch => {
        return axiosObj.post(`/logout`, {}, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                dispatch({type: actionTypes.SIGNOUT});
            })
            .catch(err => console.log(err))
    }
}