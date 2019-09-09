export default (state = {}, action) => {
    switch(action.type) {
        case 'RESEVATION_DETAILS':
            return action.payload;
        default:
            return state;
    };
};