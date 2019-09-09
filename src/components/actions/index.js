import foodApi from '../api/foodApi';

export const hoverNav = status => {
    return {
        type: 'HOVER_NAV',
        payload: status
    };
};

export const headerAccepted = bool => {
    return {
        type: 'HOVER_SHOULD_SHOW',
        payload: bool
    };
};

export const navChangeStyle = bool => {
    return {
        type: 'CHANGE_NAV_STYLE',
        payload: bool
    };
};

export const enterMainPage = () => {
    return {
        type: 'ON_MAIN'
    };
};

export const enterAboutPage = () => {
    return {
        type: 'ON_ABOUT'
    };
};

export const enterLocationSubpage = () => {
    return {
        type: 'ON_LOCATION'
    };
};

export const enterStaffSubpage = () => {
    return {
        type: 'ON_STAFF'
    };
};

export const enterOfferPage = () => {
    return {
        type: 'ON_OFFER'
    };
};

export const enterReservationPage = () => {
    return {
        type: 'ON_RESERVATION'
    };
};

export const enterMessagePage = () => {
    return {
        type: 'ON_MESSAGE'
    };
};

export const enterContactPage = () => {
    return {
        type: 'ON_CONTACT'
    };
};

export const enterMealsPage = () => {
    return {
        type: 'ON_MEALS'
    };
};

export const leavePage = () => {
    return {
        type: 'OFF_PAGE'
    };
};

export const accomodationRoom = num => {
    return {
        type: 'ROOM_DETAILS',
        payload: num
    };
};

export const arrivalSelectedDate = (day, month, year) => {
    return {
        type: 'ARRIVAL_DATE',
        payload: [day, month, year]
    };
};

export const departureSelectedDate = (day, month, year) => {
    return {
        type: 'DEPARTURE_DATE',
        payload: [day, month, year]
    };
};

export const arrivalCalendarDisplay = bool => {
    return {
        type: 'ARRIVAL_CALENDAR',
        payload: bool
    };
};

export const departureCalendarDisplay = bool => {
    return {
        type: 'DEPARTURE_CALENDAR',
        payload: bool
    };
};

export const arrivalCalendarNode = node => {
    return {
        type: 'ARRIVAL_CALENDAR_NODE',
        payload: node
    };
};

export const departureCalendarNode = node => {
    return {
        type: 'DEPARTURE_CALENDAR_NODE',
        payload: node
    };
};

export const reservationDetails = (amountOfDays, amountOfPeople) => {
    return {
        type: 'RESEVATION_DETAILS',
        payload: {
            amountOfDays,
            amountOfPeople
        }
    };
};

export const mealsIncludeBtn = num => {
    return {
        type: 'MEALS_INCLUDE',
        payload: num
    };
};

export const mealsIncludeReset = () => {
    return {
        type: 'MEALS_INCLUDE_RESET'
    };
};

export const fetchSearch = searchItem => async dispatch => {
    try {
        const response = await foodApi.get('/search', {
            params: {
                key: '68ca012a77bf74e3516815f6f291ff97',
                q: searchItem
            }
          });  
        dispatch({ type: 'FETCH_LIST', payload: response.data.recipes });
    } catch (error) {
        dispatch({ type: 'FETCH_LIST_ERR' });
    };
};

export const fetchSearchNotSuccesful = () => {
    return {
        type: 'FETCH_LIST_INGERR'
    };
};

export const fetchRecipe = searchID => async dispatch => {
    try {
        const response = await foodApi.get('/get', {
            params: {
                key: '68ca012a77bf74e3516815f6f291ff97',
                rId: searchID
            }
        });

        dispatch({ type: 'FETCH_RECIPE', payload: response.data.recipe })
    } catch (error) {
        dispatch({ type: 'FETCH_RECIPE_ERR' });
    };
};

export const pageNumber = nr => {
    return {
        type: 'PAGE_NR',
        payload: nr
    };
};

export const deleteFetchRecipe = () => {
    return {
        type: 'DELETE_FETCH_RECIPE'
    };
};

export const deleteFetchAll = () => {
    return {
        type: 'DELETE_FETCH' 
    } ;
};

export const isMobileUpdate = width => {
    return {
        type: 'WINDOW_WIDTH',
        payload: width
    };
};