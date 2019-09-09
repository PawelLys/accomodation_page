import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { navChangeStyle, headerAccepted, enterOfferPage, leavePage, hoverNav, accomodationRoom } from '../actions';
import rooms from './Rooms';

class OfferMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { startPage: false, leftSliderHover: false, rightSliderHover: false, currentRoom: rooms[0].id,
            styleFade: false };
        this.props.navChangeStyle(false);
        this.props.hoverNav(false);
        this.props.headerAccepted(true);
        setTimeout(() => {
            this.props.enterOfferPage();
        }, 100);
        setTimeout(() => {
            this.setState({ startPage: true });
        }, 300);
    };

    componentWillUnmount = () => {
        this.props.leavePage();
        this.props.accomodationRoom(null);
    }

    currentRoomAdd = () => {
        if(this.state.currentRoom < 4) {
            const nextValue = this.state.currentRoom + 1;
            this.setState({ currentRoom: nextValue });
        };
        if(this.state.currentRoom === 4)
            this.setState({ currentRoom: 0 });
        if(this.props.placeChoosed !== null) {  
            this.setState({ styleFade: true });
            setTimeout(() => {
                this.setState({ styleFade: false });
            }, 100);
        };
    };

    currentRoomSubtract = () => {
        if(this.state.currentRoom > 0) {
            const nextValue = this.state.currentRoom - 1;
            this.setState({ currentRoom: nextValue });
        };
        if(this.state.currentRoom === 0)
            this.setState({ currentRoom: 4 });
        if(this.props.placeChoosed !== null) {  
            this.setState({ styleFade: true });
            setTimeout(() => {
                this.setState({ styleFade: false });
            }, 100);
        };
    };

    renderDetails = () => {
        const place = this.props.placeChoosed;
        if(place === null) 
            return (
                <section className="offer">
                    <div className="offer-title">
                        We adapt to your needs
                    </div>
                    <div className="offer-room" 
                        style={{transform: `translateX(-${this.state.currentRoom*(100/rooms.length)}%)`}}
                    >
                        {rooms.map(rooms => {
                            return (
                                <div className="offer-room-display" key={rooms.id} 
                                    style={this.state.currentRoom === rooms.id 
                                        ? {opacity: 1, transform: 'scale(1)'} 
                                        : {opacity: .5, transform: 'scale(.8)'}
                                    }
                                >
                                    <img className="offer-room-display-photo" src={rooms.img} alt="room"/>
                                    <div className="offer-room-display-meters">
                                        Available space <span>{rooms.space} m<sup>2</sup></span>
                                    </div>
                                    <div className="offer-room-display-persons">
                                        Place for<span>{rooms.people}<ion-icon name="person"></ion-icon></span>
                                    </div>
                                    <div onClick={() => this.props.accomodationRoom(rooms.id)}
                                        className={`offer-room-display-details 
                                            ${this.state.currentRoom === rooms.id
                                                ? 'details-active' : ''}`}
                                    >
                                        See more
                                    </div>
                                </div>
                           );
                        })};
                    </div>
                    <div className=
                            {`offer-slider-left ${
                                this.state.leftSliderHover || this.props.isMobile 
                                    ? 'slider-left-active' : ''}`
                            } 
                        style={this.props.placeChoosed === null 
                            ? {opacity: 1, visibility: 'visible', transition: 'all .3s'} 
                            : {opacity: 0, visibility: 'hidden'}}
                        onMouseEnter={() => this.setState({ leftSliderHover: true })}
                        onMouseLeave={() => this.setState({ leftSliderHover: false })}
                        onClick={this.currentRoomSubtract}
                    >
                        <span className="iconify" data-icon="ant-design:left-outline" data-inline="false"></span>
                    </div>
                    <div className=
                            {`offer-slider-right ${
                                this.state.rightSliderHover || this.props.isMobile 
                                    ? 'slider-right-active' : ''}`
                            }
                        onMouseEnter={() => this.setState({ rightSliderHover: true })}
                        onMouseLeave={() => this.setState({ rightSliderHover: false })}
                        onClick={this.currentRoomAdd}
                    >
                        <span className="iconify" data-inline="false" data-icon="ant-design:right-outline"></span>
                    </div>
                </section>
            );
        else {
            return (
                <section className="offer">
                    <div className="offer-present" 
                        style={this.state.styleFade ? {opacity: '0'} : {opacity: '1', transition: 'opacity .2s'}}
                    >
                        <Link to="/reservation" className="offer-present-link">Check our prices</Link>
                        <div className="offer-present-nav">
                            <div className="offer-present-nav-close"
                                onClick={() => this.props.accomodationRoom(null)}
                            >
                                <ion-icon name="close"></ion-icon>
                            </div>
                            <div className="offer-present-nav-left"
                                onClick={this.currentRoomSubtract}
                            >
                                <ion-icon name="arrow-dropleft"></ion-icon>
                                </div>
                            <div className="offer-present-nav-right"
                                onClick={this.currentRoomAdd}
                            >
                                <ion-icon name="arrow-dropright"></ion-icon>
                            </div>
                        </div>
                        <img src={rooms[this.state.currentRoom].img} alt="room"/>
                        <div className="offer-present-title">{rooms[this.state.currentRoom].name}</div>
                        <ul className="offer-present-contains">
                            {rooms[this.state.currentRoom].contain.map((contain, index) => {
                                return (
                                    <li key={index}>
                                        {contain}
                                    </li>
                                );
                            })};
                        </ul>
                        <div className="offer-present-description">{rooms[this.state.currentRoom].description}</div>
                    </div>
                </section>
            );
        };
    };
        

    render() {
        return (
                <div style={this.state.startPage ? {opacity: '1', transition: 'opacity .1s'} : {opacity: '0'}}>
                    {this.renderDetails()}
                </div>
        );
    };
};

const mapStateToProps = state => {
    return { placeChoosed: state.accomodationChoosed, isMobile: state.isMobile };
}

export default connect(mapStateToProps, { 
    headerAccepted, navChangeStyle, enterOfferPage, leavePage, hoverNav, accomodationRoom
})(OfferMainPage);