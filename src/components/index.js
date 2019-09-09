import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './NavBar';
import MainPage from './MainPage';
import LocationMainPage from './Location/LocationMainPage';
import LocationMapPage from './Location/LocationMapPage';
import LocationStaffPage from './Location/LocationStaffPage';
import OfferMainPage from './Offer/OfferMainPage';
import OfferReservationPage from './Offer/OfferReservationPage';
import Contact from './Contact';
import ContactForm from './Extra/ContactForm';
import EatingSection from './Extra/EatingSection'

export default () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Route path="/" exact component={MainPage} />
            <Route path="/about" exact component={LocationMainPage} />
            <Route path="/map" component={LocationMapPage} />
            <Route path="/staff" component={LocationStaffPage} />
            <Route path="/offer" component={OfferMainPage} />
            <Route path="/reservation" component={OfferReservationPage} />
            <Route path="/contact" component={Contact} />
            <Route path="/message" component={ContactForm} />
            <Route path="/meals" component={EatingSection} />
        </BrowserRouter>
    );
};