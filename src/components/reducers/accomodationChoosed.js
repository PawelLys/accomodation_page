export default (state = null, action) => {
    switch(action.type) {
        case 'ROOM_DETAILS':
            return action.payload;
        default:
            return state;
    }
};