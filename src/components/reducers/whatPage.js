export default (state = '', action) => {
    switch(action.type) {
        case 'ON_MAIN':
            return 'main';
        case 'ON_ABOUT':
            return 'about';
        case 'ON_LOCATION':
            return 'location';
        case 'ON_STAFF':
            return 'staff';
        case 'ON_OFFER':
            return 'offer';
        case 'ON_RESERVATION':
            return 'reservation';
        case 'ON_MESSAGE':
            return 'message';
        case 'ON_CONTACT':
            return 'contact';
        case 'ON_MEALS':
            return 'meals';
        case 'OFF_PAGE':
            return '';
        default: 
            return state;
    }
}