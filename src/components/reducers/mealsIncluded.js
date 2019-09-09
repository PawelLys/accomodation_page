const STATE_INIT = [
    false, false, false, false, false
];

export default (state = STATE_INIT, action) => {
    if(action.type === 'MEALS_INCLUDE') 
        return state.map((bool, index) => index === action.payload ? !bool : bool);
    if(action.type === 'MEALS_INCLUDE_RESET') 
        return state.map(() => false);
    else return state;
};