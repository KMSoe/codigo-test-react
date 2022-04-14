import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ORDER:
            const newResult = [...state.orders];
            newResult.push(action.payload.order);

            return {
                ...state,
                orders: newResult
            }
        default:
            return state;
    }
}

export default reducer;