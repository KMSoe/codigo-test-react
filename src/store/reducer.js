import {combineReducers} from 'redux';
import packageReducer from './reducers/packages';
import authReducer from './reducers/auth';

const reducer = combineReducers({
    pack: packageReducer,
    auth: authReducer,
});

export default reducer;