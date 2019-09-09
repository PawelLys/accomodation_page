import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import headerState from './headerState';
import hoverConfig from './hoverConfig';
import whatPage from './whatPage';
import accomodationChoosed from './accomodationChoosed';
import displayCalendars from './displayCalendars';
import detailsReservationBook from './detailsReservationBook';
import mealsIncluded from './mealsIncluded';
import listRequest from './listRequest';
import recipeRequest from './recipeRequest';
import pageNumber from './pageNumber';
import isMobile from './isMobile';

export default combineReducers({
    headerState, hoverConfig, whatPage, accomodationChoosed, displayCalendars, detailsReservationBook, 
    mealsIncluded, listRequest, recipeRequest, pageNumber, isMobile,
    form: formReducer
});