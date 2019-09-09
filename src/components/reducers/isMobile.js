export default (state = false, action) => {
    if(action.type === 'WINDOW_WIDTH')
        return action.payload;
    else return state;
}