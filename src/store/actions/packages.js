import axiosObj from '../../axiosObj';
import * as actionTypes from './actionTypes';

export const loadPackages = () => {
    return dispatch => {
        axiosObj.get(`/packages`, { headers: { Authorization: `Bearer ` } })
            .then(({ data }) => {
                dispatch({type: actionTypes.LOAD_PACKAGES,payload: data.data.pack_list});
            })
            .catch(err => {
                console.log(err);
            })
    }
}