const STATE_INITIAL = {
    hoverShouldShow: true,
    changeStyle: false
};

export default (state = STATE_INITIAL, action) => {
    switch(action.type) {
        case 'HOVER_SHOULD_SHOW': 
            return {...state, hoverShouldShow: action.payload};
        case 'CHANGE_NAV_STYLE':
            return {...state, changeStyle: action.payload};
        default:
            return state;
    };
};