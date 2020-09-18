import { SIGN_IN, SIGN_OUT} from '../actions/types.actions';

const INITIAL_STATE = {
    isSignedIn: null,
    userName: null,
    userId: null,
    auth: {}
}

export default (state = INITIAL_STATE, action) => {
    // const {userName, userId} = action.payload;
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isSignedIn: true, 
                userName: action.payload.userName, 
                userId: action.payload.userId
            }
        case SIGN_OUT:
            return {...state, isSignedIn: false, userName: null, userId: null, auth: action.payload.auth}
        default:
            return state
    }
}