import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hoverNav, isMobileUpdate } from './actions';

class NavBar extends React.Component {
    state = { headerHover: false, visible: true, showPartOne: false, showPartTwo: false, showPartThree: false,
        hoverSelectedHeaderChangedStyle: false, showMobileMenu: false, showAboutList: false, showOfferList: false };

    componentDidMount() {
        this.props.isMobileUpdate(window.innerWidth <= 1024);
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener('resize', () => {
            this.props.isMobileUpdate(window.innerWidth <= 1024);
        });
    };
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener('resize', () => {
            this.props.isMobileUpdate(window.innerWidth <= 1024);
        });
    };

    componentDidUpdate = () => {
        if(this.props.hoverConfig.hoverShouldShow && this.props.whatCurrentPage === null)
            this.props.hoverNav(false);
        if(this.props.whatCurrentPage !== 'main' && this.props.whatCurrentPage !== 'offer' 
            && this.props.whatCurrentPage !== 'message') {
            if(!this.state.showPartOne && !this.state.showPartTwo && !this.state.showPartThree)
                this.props.hoverNav(false);
        };
        if(!this.state.visible) {
            if(this.props.whatCurrentPage !== 'main' && this.props.whatCurrentPage !== 'about' 
                && this.props.whatCurrentPage !== 'reservation')
                this.setState({ visible: true });
        };
        if(this.props.isMobile && this.state.showMobileMenu)
            document.addEventListener('mousedown', this.handleClickMousedown);
    };
    
    handleScroll = () => {    
        if(this.state.visible === false && this.props.whatCurrentPage !== 'main') this.props.hoverNav(false);
        if(this.props.whatCurrentPage === 'main')
            this.setState({ visible: document.querySelector(`.submain`).offsetTop > window.pageYOffset });
        if(this.props.whatCurrentPage === 'about') {
            this.setState({ visible: document.querySelector(`.about-show`).offsetTop > window.pageYOffset });
            if(window.pageYOffset > 0) this.props.hoverNav(false);
        };
        if(this.props.whatCurrentPage === 'reservation')
            this.setState({ visible: document.querySelector(`.resevation-main`).offsetTop > window.pageYOffset });
    };

    setWrapperRef = node => {
        this.wrapperRef = node;
    }
    setWrapperRef2 = node => {
        this.wrapperRef2 = node;
    }

    handleClickMousedown = event => {
        if(this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if(this.wrapperRef2 && !this.wrapperRef2.contains(event.target))
                this.setState({ showMobileMenu: false, showAboutList: false, showOfferList: false });
        };
        if(event.target.tagName.toLowerCase() === 'a')
            setTimeout(() => {
                this.setState({ showMobileMenu: false, showAboutList: false, showOfferList: false });
            }, 100);
    }

    changeHeaderHover = () => {
        this.setState({ headerHover: !this.state.headerHover });
        if(this.state.headerHover) this.props.hoverNav(false);
    };

    changeHoverTrue(part = null) {
        this.props.hoverNav(true);
        if(!this.props.hoverConfig.hoverShouldShow) {
            if(part === 1) 
                    this.setState({ showPartOne: true, showPartTwo: false, showPartThree: false });
            else if(part === 2)
                    this.setState({ showPartOne: false, showPartTwo: true, showPartThree: false });
            else if(part === 3)
                    this.setState({ showPartOne: false, showPartTwo: false, showPartThree: true });
        };
    };

    styleHeaderSelectedTitle = (check) => {
        if(!this.props.hoverConfig.hoverShouldShow && check !== true)
            return {opacity: '0', visibility: 'hidden'};
        else {
            if(this.props.hoverConfig.changeStyle) {
                const style = {backgroundColor: 'rgba(255, 255, 255, 0)', opacity: '1', transition: 'all .3s',  
                visiblity: 'visible', padding: '2rem'}
                if(this.state.showPartTwo)
                    return { ...style,  marginRight: '12rem' };
                else if(this.state.showPartOne) 
                    return { ...style, marginRight: '10rem' };
                else return { ...style, marginRight: '13rem' };
            } else return {opacity: '1', visiblity: 'visible'};
        };
    };

    showMobileMenu = () => {
        this.setState({ 
            showMobileMenu: !this.state.showMobileMenu, 
            showAboutList: false, 
            showOfferList: false 
        });
    }
    
    showAboutList = () => this.setState({ showAboutList: !this.state.showAboutList });
    
    showOfferList = () => this.setState({ showOfferList: !this.state.showOfferList });

    render() {
        if(this.props.isMobile)
            return (
                <div className="header_mobile">
                    <span className="iconify" data-icon="whh:doghouse" data-inline="false"></span>
                    <div className="header_mobile-container" onClick={this.showMobileMenu} 
                        ref={this.setWrapperRef}
                    >
                        <div className={`header_mobile-container-iconup ${!this.state.showMobileMenu
                            ? 'header_mobile-hidden_icon'
                            : '' }`}
                        >
                            <ion-icon name="close"></ion-icon>
                        </div>
                        <div className={`header_mobile-container-icondown ${this.state.showMobileMenu
                            ? 'header_mobile-hidden_icon'
                            : '' }`}
                        >
                            <ion-icon name="menu"></ion-icon>
                        </div>
                    </div>
                    <div className={`header_mobile-menu ${this.state.showMobileMenu 
                                        ? '' : 'header_menu-hidden' }
                                    `}
                        ref={this.setWrapperRef2}
                    >
                        <div className="header_mobile-menu-element"
                            style={this.props.whatCurrentPage === 'main' 
                                ? {display: 'none'} 
                                : {}
                            }
                        >
                            <Link to="/">Home</Link> 
                        </div>
                        <div className="header_mobile-menu-element">
                            <Link to="/about">About Us</Link>
                            <ion-icon name="arrow-dropdown"
                                style={this.state.showAboutList ? {} : {transform: 'rotate(180deg)'}}
                                onClick={this.showAboutList}
                            />
                            <div className={`header_mobile-menu-element-item 
                                ${this.state.showAboutList ? '' : 'header_menu-hidden'}`}
                            >
                                <Link to="/map">Location</Link>
                                <span><Link to="/staff">Board</Link></span>
                            </div>
                        </div>
                        <div className="header_mobile-menu-element">
                            <Link to="/offer">Offer</Link>
                            <ion-icon name="arrow-dropdown"
                                style={this.state.showOfferList ? {} : {transform: 'rotate(180deg)'}}
                                onClick={this.showOfferList}
                            />
                            <div className={`header_mobile-menu-element-item 
                                ${this.state.showOfferList ? '' : 'header_menu-hidden'}`}
                            >
                                <Link to="/reservation">Reservation</Link>
                            </div>
                        </div>
                        <div className="header_mobile-menu-element">
                            <Link to="/contact">Contact</Link> 
                        </div>
                        <div className="header_mobile-menu-element">
                            <Link to="/message">
                                Contact with us
                                <ion-icon name="mail"></ion-icon>
                            </Link>
                            <Link to="/meals"> 
                                Our menu
                                <ion-icon name="pizza"></ion-icon> 
                            </Link>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div className={this.props.hoverConfig.changeStyle ? 'header-dark_style' : 'header'} 
                    onMouseEnter={this.changeHeaderHover} 
                    onMouseLeave={this.changeHeaderHover}
                    style={this.state.visible ? {transform: 'translateY(0%)'} : {transform: 'translateY(-100%)'}}
                >
                    <span className="iconify" data-icon="whh:doghouse" data-inline="false"></span>
                    <div className="header-links">
                        {this.props.whatCurrentPage === 'main' ? 
                            null : <Link to="/" onMouseEnter={() => this.props.hoverNav(false)}>Home</Link>
                        }
                        <Link to="/about" onMouseEnter={() => this.changeHoverTrue(1)}
                            onMouseLeave={() => this.setState({ showPartOne: false })}
                        >
                            About us
                        </Link>
                        <Link to="/offer" onMouseEnter={() => this.changeHoverTrue(2)}
                            onMouseLeave={() => this.setState({ showPartTwo: false })}
                        >
                            Our offer
                        </Link>
                        <Link to="/contact" onMouseEnter={() => this.changeHoverTrue(3)}
                            onMouseLeave={() => this.setState({ showPartThree: false })}
                        >
                            Contact
                        </Link>
                        <div className="header-links_details">
                            <Link to="/message" onMouseEnter={() => this.props.hoverNav(false)}>
                                <ion-icon name="mail"></ion-icon>
                            </Link>
                            <Link to="/meals" onMouseEnter={() => this.props.hoverNav(false)}>
                                <ion-icon name="pizza"></ion-icon>
                            </Link>
                        </div>
                    </div>
                    <div className={this.props.hover ? "header-selected" : "header-hidden"}
                        style={this.props.hoverConfig.changeStyle ?
                            {backgroundColor: 'rgba(255, 255, 255, 0)', height: '18rem', 
                            padding: '0', top: '5.3rem', color: '#fff'}
                            : null}
                    >
                        <div className="header-selected_title"> 
                            <div className="header-selected_title-item"
                                style={this.styleHeaderSelectedTitle(this.state.showPartOne)}
                                onMouseEnter={() => this.setState({ showPartOne: true })}
                                onMouseLeave={() => this.setState({ showPartOne: false })}
                            >
                                <Link to="/about">About us</Link>
                                <div className="header-selected_title-item-el">
                                    <Link to="/map">Location</Link>
                                </div>
                                <div className="header-selected_title-item-el">
                                    <Link to="/staff">Board</Link>
                                </div>
                            </div>
                            <div className="header-selected_title-item"
                                style={this.styleHeaderSelectedTitle(this.state.showPartTwo)}
                                onMouseEnter={() => this.setState({ showPartTwo: true })}
                                onMouseLeave={() => this.setState({ showPartTwo: false })}
                            >
                                <Link to="/offer">Our offer</Link>
                                <div className="header-selected_title-item-el">
                                    <Link to="/reservation">Reservation</Link>
                                </div>
                            </div>
                            <div className="header-selected_title-item"
                                style={this.styleHeaderSelectedTitle(this.state.showPartThree)}
                                onMouseEnter={() => this.setState({ showPartThree: true })}
                                onMouseLeave={() => this.setState({ showPartThree: false })}
                            >
                                <Link to="/contact">Contact</Link>
                            </div>
                        </div>
                    </div>
                </div>
        );
    };
};

const mapStateToProps = state => {
    return { hover: state.headerState, hoverConfig: state.hoverConfig, whatCurrentPage: state.whatPage,
        isMobile: state.isMobile };
}

export default connect(mapStateToProps, { hoverNav, isMobileUpdate })(NavBar);