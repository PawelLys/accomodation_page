const STATE_INIT = {
    arrivalDate: [],
    arrivalCalendar: false,
    wrapperRef: undefined,
    departureDate: [],
    departureCalendar: false,
    wrapperRefDepart: undefined
};

export default (state = STATE_INIT, action) => {
    if(action.type === 'ARRIVAL_CALENDAR')
        return {...state, arrivalCalendar: action.payload};
    if(action.type === 'ARRIVAL_DATE')
        return {...state, arrivalDate: action.payload};
    if(action.type === 'ARRIVAL_CALENDAR_NODE')
        return {...state, wrapperRef: action.payload};
    if(action.type === 'DEPARTURE_CALENDAR')
        return {...state, departureCalendar: action.payload};
    if(action.type === 'DEPARTURE_DATE')
        return {...state, departureDate: action.payload};
    if(action.type === 'DEPARTURE_CALENDAR_NODE')
        return {...state, wrapperRefDepart: action.payload};
    else return state;
}