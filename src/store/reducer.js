import {combineReducers} from 'redux';
import packageReducer from './reducers/packages';

const reducer = combineReducers({
    pack: packageReducer
});

export default reducer;