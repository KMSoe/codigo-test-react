import {combineReducers} from 'redux';
import packageReducer from './reducers/packages';
import authReducer from './reducers/auth';
import orderReducer from './reducers/orders';

const reducer = combineReducers({
    pack: packageReducer,
    auth: authReducer,
    order: orderReducer,
});

export default reducer;