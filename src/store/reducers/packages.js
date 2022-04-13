import * as actionTypes from '../actions/actionTypes';

const initialState = {
    packages: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_PACKAGES:
            return {
                ...state,
                packages: action.payload.packages
            }
        default:
            return state;
    }
}

export default reducer;