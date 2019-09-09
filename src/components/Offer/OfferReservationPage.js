import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { navChangeStyle, headerAccepted, enterReservationPage, leavePage, hoverNav, 
    arrivalCalendarDisplay, arrivalSelectedDate, departureCalendarDisplay,
    departureSelectedDate, reservationDetails, mealsIncludeBtn, mealsIncludeReset } from '../actions';
import Calendar from './calendar';
import CalendarDeparture from './calendarDeparture';
import rooms from './Rooms';

class OfferReservationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { startPage: false, displayCurrentDay: false, displayArrivalDate: false, 
            arrivalDateNotChoosed: false, peopleInputValue: '', peopleInputRedBG: false,
            arrivalInputRedBG: false, departureInputRedBG: false, selectedRoomId: null  };
        this.props.navChangeStyle(true);
        window.scrollTo(0, 0);
        this.props.headerAccepted(false);
        this.props.hoverNav(false);
        setTimeout(() => {
            this.props.enterReservationPage();
        }, 100);
        setTimeout(() => {
            this.setState({ startPage: true });
        }, 300);
    };

    componentDidUpdate() {
        if(this.props.arrivalCalendar || this.props.departureCalendar) 
            document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        this.props.leavePage();
        this.props.arrivalCalendarDisplay(false);
        this.props.departureCalendarDisplay(false);
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    setWrapperRef = node => {
        this.wrapperRef = node;
    }
    setWrapperRef2 = node => {
        this.wrapperRef2 = node;
    }

    handleClickOutside = event => {
        this.setState({ displayCurrentDay: false, displayArrivalDate: false, arrivalDateNotChoosed: false});

        if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if(this.wrapperRef2 && !this.wrapperRef2.contains(event.target)) {
                if(this.props.wrapperRef && !this.props.wrapperRef.contains(event.target))
                        this.props.arrivalCalendarDisplay(false);
                if(this.props.wrapperRefDepart && !this.props.wrapperRefDepart.contains(event.target))
                        this.props.departureCalendarDisplay(false);
            };
        };
    };

    arrivalDate = () => {
        if(this.props.arrivalDate.length >= 1) {
            if(this.props.arrivalDate[2] === moment().year()) {
                if(this.props.arrivalDate[1] < moment().month()) {
                    this.props.arrivalSelectedDate(moment().date(), moment().month(), moment().year());
                    this.setState({ displayCurrentDay: true });
                } else if(this.props.arrivalDate[1] === moment().month()) {
                    if(this.props.arrivalDate[0] < moment().date()) {
                        this.props.arrivalSelectedDate(moment().date(), moment().month(), moment().year());
                        this.setState({ displayCurrentDay: true });
                    };
                };
            };
            return `${this.props.arrivalDate[0]}-${this.props.arrivalDate[1] + 1}-${this.props.arrivalDate[2]}`;
        } else return '';
    };

    departureDate = () => {
        if(this.props.departureDate.length >= 1) {
            if(this.props.departureDate[2] === this.props.arrivalDate[2]) {
                if(this.props.departureDate[1] < this.props.arrivalDate[1]) {
                    this.props.departureSelectedDate(
                        this.props.arrivalDate[0], 
                        this.props.arrivalDate[1], 
                        this.props.arrivalDate[2]
                    );
                    this.setState({ displayArrivalDate: true });
                } else if(this.props.departureDate[1] === this.props.arrivalDate[1]) {
                    if(this.props.departureDate[0] < this.props.arrivalDate[0]) {
                        this.props.departureSelectedDate(
                            this.props.arrivalDate[0], 
                            this.props.arrivalDate[1], 
                            this.props.arrivalDate[2]
                        );
                        this.setState({ displayArrivalDate: true });
                    };
                };
            };
            return `${this.props.departureDate[0]}-${this.props.departureDate[1] + 1}-${this.props.departureDate[2]}`;
        } else return '';
    };

    onClickArrivalField = () => {
        this.setState(this.resetStateRedBG());
        this.props.arrivalCalendarDisplay(!this.props.arrivalCalendar);
        this.props.departureCalendarDisplay(false);
    };

    onClickDepartureField = () => {
        this.setState(this.resetStateRedBG());
        if(this.props.arrivalDate.length >= 1) 
            this.props.departureCalendarDisplay(!this.props.departureCalendar);
        else this.setState({ arrivalDateNotChoosed: true });
        this.props.arrivalCalendarDisplay(false);
    };

    departureWarningText = () => {
        if(this.state.arrivalDateNotChoosed)
            return 'Select arrival date first';
        else if(this.state.displayArrivalDate)
            return `Your arrival's date is: ${this.arrivalDate()}`;
        else return null;
    };

    departureWarningStyle = () => {
        if(this.state.displayArrivalDate)
            return {visibility: 'visible', opacity: '1', transition: 'opacity .2s', width: '22rem'};
        else if(this.state.arrivalDateNotChoosed)
            return {visibility: 'visible', opacity: '1', transition: 'opacity .2s'};
        else return {visibility: 'hidden', opacity: '0'};                 
    };

    onBookNowBtnClick = async () => {
        if(this.props.arrivalDate.length < 2 || this.props.departureDate.length < 2 ||
            this.state.peopleInputValue === '' || this.state.peopleInputValue <= 0) {
            if(this.props.arrivalDate.length < 2) this.setState({ arrivalInputRedBG: true });
            if(this.props.departureDate.length < 2) this.setState({ departureInputRedBG: true });
            if(this.state.peopleInputValue === '' || this.state.peopleInputValue <= 0)
                this.setState({ peopleInputRedBG: true });
        } else {
            this.setState({ peopleInputValue: '' });
            if(!isEmpty(this.props.detailsAboutReservation)) {
                this.props.mealsIncludeReset();
                this.setState({ selectedRoomId: null });
            };
        const arrival = moment(`${this.props.arrivalDate[2]} ${this.props.arrivalDate[1]} 
            ${this.props.arrivalDate[0]}`, "YYYY MM DD");
        const departure = moment(`${this.props.departureDate[2]} ${this.props.departureDate[1]} 
            ${this.props.departureDate[0]}`, "YYYY MM DD");

        await this.props.reservationDetails(departure.diff(arrival, "days"), this.state.peopleInputValue);
        }
    };

    resetStateRedBG = () => {
        return { peopleInputRedBG: false, arrivalInputRedBG: false, departureInputRedBG: false};
    }

    mealsChange = id => this.props.mealsIncludeBtn(id);

    calculation = id => {
        const days = this.props.detailsAboutReservation.amountOfDays;
        const people = this.props.detailsAboutReservation.amountOfPeople;
        const priceForNight = rooms[id].price * days;
        const priceForMeals = 60 * people * days;
        const price = this.props.mealsIncluded[id] ? priceForNight + priceForMeals : priceForNight;
        return price;
    }

    calculatePrice = (id) => {
        return <div>{this.calculation(id)}<ion-icon name="logo-euro"></ion-icon></div>;
    }

    displaySelectedRoom = () => {
        const days = this.props.detailsAboutReservation.amountOfDays;
        const people = this.props.detailsAboutReservation.amountOfPeople;
        const id = this.state.selectedRoomId;
        return (
            <div className="resevation-main-cash-container-body-selected" 
                style={{ height: '100%', 
                    backgroundImage: `url(${rooms[id].img})` }}
            >
                <div className="resevation-main-cash-container-body-selected-text">
                    {rooms[id].name}
                    <span>
                        {people} person{people > 1 ? 's' : ''} for {days} day{days > 1 ? 's' : ''} 
                        <br/>{this.props.mealsIncluded[id] ? 'with meals' : ''}
                    </span>
                </div>
            </div>
        );
    
    };
    
    render() {
        return (
            <section style={this.state.startPage 
                ? {opacity: '1', transition: 'opacity .1s', overflow: 'hidden'} : {opacity: '0'}}
            >
               <div className="reservation-header">
                    <div className="reservation-header-data">
                        <div className="reservation-header-data_arrival">
                            <Calendar
                                style={{ position: 'absolute', bottom: '29.6rem', left: '2rem', zIndex: '2' }}
                            />
                            <div className="reservation-header-data-field" 
                                onClick={this.onClickArrivalField}
                                ref={this.setWrapperRef}
                            />
                            <div className="reservation-header-data-title">
                                Date of arrival:
                            </div>
                            <input className={`reservation-header-data-input${this.state.arrivalInputRedBG 
                                    ? '-redbg' : ''}`}
                                style={ this.props.arrivalCalendar 
                                    ? {transform: 'scale(0.99)', 
                                        boxShadow: 'inset 0 .5rem .3rem rgba(0, 0, 0, 0.301)',
                                        transition: 'all .2s'
                                    } : {transition: 'all .2s'}
                                }
                                value={this.arrivalDate()}
                                placeholder="Choose arrival date"
                                disabled
                            />
                            <div className="reservation-header-data-todayswarning"
                                style={this.state.displayCurrentDay 
                                    ? {visibility: 'visible', opacity: '1', transition: 'all .2s'}
                                    : {visibility: 'hidden', opacity: '0'}
                                }
                            >
                                <span className="iconify" data-icon="ant-design:warning-twotone" data-inline="false"/>
                                Today's date is: {`${moment().date()}-${moment().month()}-${moment().year()}`}
                            </div>
                        </div>
                        <div className="reservation-header-data_departure">
                            <CalendarDeparture
                                style={{ position: 'absolute', bottom: '29.6rem', left: '2rem', zIndex: '2' }}
                            />
                            <div className="reservation-header-data-field" 
                                onClick={this.onClickDepartureField}
                                ref={this.setWrapperRef2}
                            />
                            <div className="reservation-header-data-title">
                                Date of departure:
                            </div>
                            <input 
                                className={`reservation-header-data-input${this.state.departureInputRedBG 
                                    ? '-redbg' : ''}`}
                                style={ this.props.departureCalendar 
                                    ? {transform: 'scale(0.99)', 
                                        boxShadow: 'inset 0 .5rem .3rem rgba(0, 0, 0, 0.301)',
                                        transition: 'all .2s'
                                    } : {transition: 'all .2s'}
                                }
                                value={this.departureDate()}
                                placeholder="Choose departure date"
                                disabled
                            />
                            <div className="reservation-header-data-todayswarning"
                                style={this.departureWarningStyle()}
                            >
                                <span className="iconify" data-icon="ant-design:warning-twotone" data-inline="false"/>
                                {this.departureWarningText()}
                            </div>
                        </div>
                        <div className="reservation-header-data_people">
                            <div className="reservation-header-data-title_small">
                                Number of people:
                            </div>
                            <input 
                                className={`reservation-header-data-input_small 
                                    ${this.state.peopleInputRedBG 
                                        ? 'reservation-header-data-input-redbg' : ''}`
                                    } 
                                type="number"
                                value={this.state.peopleInputValue}
                                onChange={event => this.setState({ peopleInputValue: event.target.value })}
                                onClick={() => this.setState(this.resetStateRedBG())
                                }
                            />
                        </div>
                        <div className="reservation-header-data_enter">
                            <button 
                                className={`reservation-header-data_enter-btn${this.state.peopleInputRedBG
                                    || this.state.arrivalInputRedBG || this.state.departureInputRedBG
                                    ? '_redbg' : ''}`
                                } 
                                onClick={this.onBookNowBtnClick}
                            >
                                Book Now
                            </button>
                            <div className="reservation-header-data-todayswarning" 
                                style={this.state.peopleInputRedBG || this.state.arrivalInputRedBG 
                                    || this.state.departureInputRedBG 
                                        ? {visibility: 'visible', opacity: '1', transition: 'opacity .2s', 
                                            left: '-4rem', width: '25rem'} 
                                        : {visibility: 'hidden', opacity: '0'}
                                }
                            >
                                <span className="iconify" data-icon="ant-design:warning-twotone" data-inline="false"/>
                                All inputs needs to be filled correctly
                            </div>
                        </div>
                    </div>
               </div>
               <div className="resevation-main"
                    style={!isEmpty(this.props.detailsAboutReservation) 
                        ? {backgroundColor: 'rgba(0, 0, 0, 0)'} : {}}
               >
                    <div className="resevation-main-description"
                        style={!isEmpty(this.props.detailsAboutReservation) ? { display: 'none' } : {}}
                    >
                        Choose date and amount of accompanying persons if you want to make a reservation.
                    </div>
                    <div className="resevation-main-rooms"
                        style={!isEmpty(this.props.detailsAboutReservation) ? {} : { display: 'none' }}
                    >
                        Choose your room
                        {rooms.map(rooms => {
                            return (
                                <div className="resevation-main-rooms-display" key={rooms.id}>
                                    <img className="resevation-main-rooms-display-photo" 
                                        src={rooms.img} alt="room"
                                    />
                                    <div className="resevation-main-rooms-display-shortdesc">
                                        {rooms.descShort}
                                    </div>
                                    <div className="resevation-main-rooms-display-icon" 
                                        onClick={() => this.setState({ selectedRoomId: rooms.id })}
                                    >
                                            <ion-icon name="basket"></ion-icon>
                                    </div>
                                    <div className="resevation-main-rooms-display-emptyspace"/>
                                    <div className="resevation-main-rooms-display-description">
                                        <div className="resevation-main-rooms-display-description-info">
                                            <div 
                                                className="resevation-main-rooms-display-description-info-aditional"
                                            >
                                                <div className="resevation-main-arrow_right"></div>
                                                <p>Aditional information:</p>
                                                {rooms.aditionalInfo}
                                            </div>
                                            <div 
                                                className="resevation-main-rooms-display-description-info-extras"
                                            >
                                                <p>
                                                    <input type="checkbox" 
                                                        checked={this.props.mealsIncluded[rooms.id]}
                                                        onChange={() => this.mealsChange(rooms.id)}
                                                        />
                                                        meals
                                                </p> (3 meals per day)
                                                {this.props.mealsIncluded[rooms.id] 
                                                    ?   <span>
                                                            60<ion-icon name="logo-euro"></ion-icon>
                                                            for each person separatetely
                                                        </span> 
                                                    : ''}
                                                    <div className="resevation-main-arrow_right"
                                                        style={
                                                            this.props.mealsIncluded[rooms.id] 
                                                            ? {} : {display: 'none'}
                                                        }
                                                    />
                                            </div>
                                        </div>
                                        <div className="resevation-main-rooms-display-description-price">
                                            {this.props.detailsAboutReservation.amountOfDays} 
                                            {` night${this.props.detailsAboutReservation.amountOfDays > 1 
                                                ? 's' : ''}`}
                                            {', '}
                                            {this.props.detailsAboutReservation.amountOfPeople} 
                                            {` person${this.props.detailsAboutReservation.amountOfPeople > 1 
                                                ? 's' : ''}`}
                                            <p>(x{rooms.price}<ion-icon name="logo-euro"></ion-icon> per night)</p>
                                            <p style={this.props.mealsIncluded[rooms.id] ? {} : {display: 'none'}}>
                                                (x60<ion-icon name="logo-euro"></ion-icon> for meals)
                                            </p>
                                            <div>
                                                {this.calculatePrice(rooms.id)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           );
                        })};
                    </div>
                    <div className="resevation-main-cash"
                        style={!isEmpty(this.props.detailsAboutReservation) ? {} : { display: 'none' }}
                    >
                        <div className="resevation-main-cash-container">
                            <div className="resevation-main-cash-container-body">
                                {this.state.selectedRoomId === null 
                                    ? <p>Select a room <br/> <ion-icon name="basket"></ion-icon></p>
                                    : this.displaySelectedRoom()
                                }
                            </div>
                            <div className="resevation-main-cash-container-final">
                                Total:
                                <p>
                                    {this.state.selectedRoomId === null 
                                        ? '0' : this.calculation(this.state.selectedRoomId)}
                                    <ion-icon name="logo-euro"></ion-icon>
                                </p>
                            </div>
                        </div>
                    </div>
               </div>
            </section>
        );
    };
};

const mapStateToProp = state => {
    return { 
        arrivalCalendar: state.displayCalendars.arrivalCalendar, 
        wrapperRef: state.displayCalendars.wrapperRef,
        arrivalDate: state.displayCalendars.arrivalDate,
        departureDate: state.displayCalendars.departureDate,
        departureCalendar: state.displayCalendars.departureCalendar,
        wrapperRefDepart: state.displayCalendars.wrapperRefDepart,
        detailsAboutReservation: state.detailsReservationBook,
        mealsIncluded: state.mealsIncluded
    };
}

export default connect(mapStateToProp, {
    navChangeStyle, headerAccepted, enterReservationPage, leavePage, hoverNav, arrivalCalendarDisplay, 
    arrivalSelectedDate, departureCalendarDisplay, departureSelectedDate, reservationDetails, 
    mealsIncludeBtn, mealsIncludeReset
})(OfferReservationPage);