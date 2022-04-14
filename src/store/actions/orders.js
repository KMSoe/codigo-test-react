import axiosObj from '../../axiosObj';
import * as actionTypes from './actionTypes';

export const createOrder = (packId, grantTotal) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axiosObj.post(`/orders`, JSON.stringify({ package_id: packId, grant_total: grantTotal }), { headers: { Authorization: `Bearer ${getState().auth.token}` } })
                .then(({ data }) => {
                    dispatch({ type: actionTypes.CREATE_ORDER, payload: { order: data.data } });

                    resolve(data.data);
                })
                .catch(({ response }) => {
                    reject(response.data);
                })
        })

    }
}
