import * as actionTypes from '../actions/actionTypes';

const initialState = {
    packages: [],
    selectPackage: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_PACKAGES:
            return {
                ...state,
                packages: action.payload.packages
            }
        case actionTypes.SELECT_PACKAGE:
            return {
                ...state,
                selectPackage: action.payload.package
            }
        default:
            return state;
    }
}

export default reducer;