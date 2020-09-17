import streams from '../api/streams';
import {
    SIGN_IN, 
    SIGN_OUT, 
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types.actions';
// todo: add user name

export const signIn = ({userId, userName}) => {
    return {
        type: SIGN_IN,
        payload:  {
            userId,
            userName
        }
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = formValues => async dispatch => {
    const response = await streams.post('/streams', formValues);
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    })
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = (streamId) => async dispatch => {
    const response = await streams.get(`/stream/${streamId}`);
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const editStream = (streamId, formValues) => async dispatch => {
    const response = await streams.put(`/stream/${streamId}`, formValues);
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    })
}

export const deleteStream = (streamId) => async dispatch => {
    await streams.delete(`/stream/${streamId}`);
    dispatch({
        type: EDIT_STREAM,
        payload: streamId
    })
}

