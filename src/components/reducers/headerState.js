export default (state = false, action) => {
    if(action.type === 'HOVER_NAV')
        return action.payload;
    else return state;
}