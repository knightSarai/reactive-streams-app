const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD':
            return {...state}
        case 'TOGGLE':
            return {...state, isDarkMood: action.payload.isDarkMood}
        default:
            return state
    }
}
export default reducer;