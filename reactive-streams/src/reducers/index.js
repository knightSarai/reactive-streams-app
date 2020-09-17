import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth.reducer';
import streamReducer from './stream.reducer';
export default combineReducers({
    auth: authReducer,
    streams: streamReducer,
    form: formReducer
})