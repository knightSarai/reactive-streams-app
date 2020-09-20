import streams from '../api/streams';
import history from '../helpers/history';
import {
    INIT_OAUTH,
    SIGN_IN, 
    SIGN_OUT, 
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types.actions';
// todo: add user name

export const initOath = ({oauth}) => {
    return {
        type: INIT_OAUTH,
        payload:  {
            oauth
        }
    }
}

export const signIn = ({userId, userName}) => {
    return {
        type: SIGN_IN,
        payload:  {
            userId,
            userName,
        }
    }
}

export const signOut = (auth) => {
    return {
        type: SIGN_OUT,
        payload: {
            auth
        }
    }
}

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId});
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    })
    history.push('/')
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = (streamId) => async dispatch => {
    const response = await streams.get(`/streams/${streamId}`);
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const editStream = (streamId, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${streamId}`, formValues);
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });
    history.push('/')
}

export const deleteStream = (streamId) => async dispatch => {
    await streams.delete(`/streams/${streamId}`);
    dispatch({
        type: DELETE_STREAM,
        payload: streamId
    })
    history.push('/')
}

