import axiosObj from '../../axiosObj';
import * as actionTypes from './actionTypes';

export const loadPackages = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axiosObj.get(`/packages`, { headers: { Authorization: `Bearer ${getState().auth.token}` } })
                .then(({ data }) => {
                    dispatch({ type: actionTypes.LOAD_PACKAGES, payload: { packages: data.data.pack_list } });
                })
                .catch(({ response }) => {
                    reject(response.data);
                })
        })

    }
}