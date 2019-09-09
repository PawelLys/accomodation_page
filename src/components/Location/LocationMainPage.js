import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { navChangeStyle, headerAccepted, enterAboutPage, leavePage, hoverNav } from '../actions';

class LocationMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { startPage: false, slideInfoBtnSelected: 0, slideDetailBtnSelected: 0, 
        displayTextArrowBackward: false, displayTextArrowForward: false  };
        window.scrollTo(0, 0);
        this.myRef = React.createRef(); 
        this.props.navChangeStyle(true);
        this.props.headerAccepted(false);
        this.props.hoverNav(false);
        setTimeout(() => {
            this.props.enterAboutPage();
        }, 100);
        setTimeout(() => {
            this.setState({ startPage: true });
        }, 300);
    };

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        this.props.leavePage();
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    };

    handleScroll = () => {    
        if(window.pageYOffset !== 0) {
            this.props.navChangeStyle(false);
            this.props.headerAccepted(true);
        } else {
            this.props.navChangeStyle(true);
            this.props.headerAccepted(false);
        };
    };

    componentDidUpdate = () => {
        this.handleScroll();
    };

    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

    render() {
        return (
                <div style={this.state.startPage ? {opacity: '1', transition: 'opacity .1s'} : {opacity: '0'}}>
                    <section className="about">
                        <div className="about-title">There is 10 years of trust behind us.</div>
                        <div className="about-description">
                            Because every client is our most important client. 
                        </div>
                        <div className="about-expand" onClick={this.scrollToMyRef}>
                            <div className="about-expand_btn">learn more</div>
                            <ion-icon name="arrow-dropdown"></ion-icon>
                        </div>
                    </section>
                    <section className="about-show" ref={this.myRef}>
                        <div className="about-show_line"></div>
                        <div className="about-show_info">
                            <div className="about-show_info-title">About us</div>
                            <div className="about-show_info-description">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                                natoque penatibus et magnis dis parturient montes, nascetur 
                                ridiculus mus. 
                                
                            </div>
                            <div className="about-show_info-arrow_left"></div>
                        </div>
                        <div className="about-show_info-quote">
                            <blockquote>
                                <TransitionGroup>
                                    <CSSTransition
                                        key={quotesArrInfo[this.state.slideInfoBtnSelected].id}
                                        timeout={300}
                                        classNames="fade_quotes"
                                    >
                                        <p>{quotesArrInfo[this.state.slideInfoBtnSelected].string}</p>
                                    </CSSTransition>
                                </TransitionGroup>
                                <button 
                                    className={this.state.slideInfoBtnSelected === 0 ? 'btn-quote-active' : ''}
                                    onClick={() => this.setState({ slideInfoBtnSelected: 0 })}
                                ></button>
                                <button 
                                    className={this.state.slideInfoBtnSelected === 1 ? 'btn-quote-active' : ''}
                                    onClick={() => this.setState({ slideInfoBtnSelected: 1 })}
                                ></button>
                                <button 
                                    className={this.state.slideInfoBtnSelected === 2 ? 'btn-quote-active' : ''}
                                    onClick={() => this.setState({ slideInfoBtnSelected: 2 })}
                                ></button>
                            </blockquote>
                            <div className="about-show_info-quote-arrow_left"></div>
                        </div>
                        <div className="about-show_details-quote">
                            <blockquote>
                            <TransitionGroup>
                                    <CSSTransition
                                        key={quotesArrDetail[this.state.slideDetailBtnSelected].id}
                                        timeout={300}
                                        classNames="fade_quotes"
                                    >
                                        <p>{quotesArrDetail[this.state.slideDetailBtnSelected].string}</p>
                                    </CSSTransition>
                                </TransitionGroup>
                                <button 
                                    className={this.state.slideDetailBtnSelected === 0 ? 'btn-quote-active' : ''}
                                    onClick={() => this.setState({ slideDetailBtnSelected: 0 })}
                                ></button>
                                <button 
                                    className={this.state.slideDetailBtnSelected === 1 ? 'btn-quote-active' : ''}
                                    onClick={() => this.setState({ slideDetailBtnSelected: 1 })}
                                ></button>
                                <button 
                                    className={this.state.slideDetailBtnSelected === 2 ? 'btn-quote-active' : ''}
                                    onClick={() => this.setState({ slideDetailBtnSelected: 2 })}
                                ></button>
                            </blockquote>
                            <div className="about-show_details-quote-arrow_right"></div>
                        </div>
                        <div className="about-show_details">
                            <div className="about-show_details-title">
                                Our policy
                            </div>
                            <div className="about-show_details-description">
                                Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. 
                                Phasellus accumsan cursus velit. Aenean ut eros et nisl sagittis vestibulum.
                            </div>
                            <div className="about-show_details-arrow_right"></div>
                        </div>
                        <div className="about-show_backward">
                            <Link to="/staff" className="about-show_backward-icon"
                                onMouseEnter={() => this.setState({ displayTextArrowBackward: true })}
                                onMouseLeave={() => this.setState({ displayTextArrowBackward: false })}
                            >
                                <span className="iconify" 
                                    data-icon="dashicons:arrow-left-alt2" 
                                    data-inline="false"
                                />
                            </Link>
                            <p style={this.state.displayTextArrowBackward ? {opacity: '1'} : {opacity: '0'}}>
                                Board
                            </p>
                        </div>
                        <div className="about-show_forward">
                            <p style={this.state.displayTextArrowForward ? {opacity: '1'} : {opacity: '0'}}>
                                Location
                            </p>
                            <Link to="/map" className="about-show_forward-icon"
                                onMouseEnter={() => this.setState({ displayTextArrowForward: true })}
                                onMouseLeave={() => this.setState({ displayTextArrowForward: false })}
                            >
                                <span className="iconify" 
                                    data-icon="dashicons:arrow-right-alt2" 
                                    data-inline="false"
                                />
                            </Link>
                        </div>
                    </section>
                </div>
        );
    };
};

const quotesArrInfo = [
    {
        id: 0,
        string: 'Lor separat existentie es un myth. Li Europan lingues es membres del sam familie.'
    },
    {
        id: 1,
        string: `On refusa continuar payar custosi traductores. 
            At solmen va esser necessi far uniform grammatica pronunciation.`
    },
    {
        id: 2,
        string: `Ma quande lingues coalesce, 
            li grammatica del resultant lingue es plu simplic e regulari quam ti del.`
    }
];

const quotesArrDetail = [
    {
        id: 0,
        string: 'It va esser tam simplic quam Occidental in fact, it va esser Occidental.'
    },
    {
        id: 1,
        string: `Li lingues differe solmen in li grammatica, li pronunciation e li plu 
            commun vocabules.`
    },
    {
        id: 2,
        string: `It va esser tam simplic quam Occidental in fact, it va esser Occidental. 
            A un Angleso it va semblar un simplificat Angles.`
    }
];

const mapStateToProps = state => {
    return { hover: state.headerState };
}

export default connect(mapStateToProps, { 
    headerAccepted, navChangeStyle, enterAboutPage, leavePage, hoverNav 
})(LocationMainPage);