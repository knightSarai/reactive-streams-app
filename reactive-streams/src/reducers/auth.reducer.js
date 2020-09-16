const INITIAL_STATE = {
    isSignedIn: null,
    userName: null,
    userId: null

}

export default (state = INITIAL_STATE, action) => {
    // const {userName, userId} = action.payload;
    switch (action.type) {
        case 'SIGN_IN':
            return {...state, isSignedIn: true, userName: action.payload.userName, userId: action.payload.userId}
        case 'SIGN_OUT':
            return {...state, isSignedIn: false, userName: null, userId: null}
        default:
            return state
    }
}