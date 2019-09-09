import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import { navChangeStyle, headerAccepted, enterMainPage, leavePage, accomodationRoom } from './actions';

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {onTop: true, firstImg: true, secondImg: true, thirdImg: true, fourthImg: true, 
            fifthImg: true, startPage: false};
        this.myRef = React.createRef(); 
        window.scrollTo(0, 0);
        this.props.navChangeStyle(false);
        this.props.headerAccepted(true);
        setTimeout(() => {
            this.props.enterMainPage();
        }, 100);
        setTimeout(() => {
            this.setState({ startPage: true });
        }, 300);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        this.props.leavePage();
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {    
        this.setState({ onTop: 0 >= window.pageYOffset });
    };

    scrollToMyRef = () => window.scrollTo(0, this.myRef.current.offsetTop);

    renderPhotoDescritpion(stateImg, string) {
        return (
            <div>
                {stateImg ? 
                    string : 
                    <Spring
                        from={{ opacity: 0 }}
                        to={{ opacity: 1 }}
                        config={{duration: 300}}
                    >
                        {props => (
                            <p><button style={props}>More info</button></p>
                        )}
                    </Spring>
                }
            </div>
        );
    };

    render() {
        return (
                <div style={this.state.startPage ? {opacity: '1', transition: 'opacity .2s'} : {opacity: '0'}}>
                    <section className="main">
                        <div className="main-title" 
                            style={this.props.hover && this.state.onTop ? {marginTop: '20rem'} : null}
                        >
                            Zakopane Accomodation
                        </div>
                        <div className="main-description">
                            You also thing that our mountains are beautiful and want to spend an amazing vacations 
                            in Zakopane?
                            <p style={{ marginTop: '1rem', paddingBottom: '5rem' }}> 
                                Check our wide range of houses and rooms.
                            </p>
                        </div>
                        <ion-icon name="arrow-down" onClick={this.scrollToMyRef}></ion-icon>
                    </section>
                    <section className="submain" ref={this.myRef}>
                        <div className="submain-title">
                            Situated in the breathtakingly beautiful Zakopane
                        </div>
                        <div className="submain-description">
                            <div className="submain-description_item"> 
                                <img src="css/img/room-inside.jpg" alt="room"></img>
                                All apartments were designed by famous interior designer, fully equipped with 
                                modern furniture with kitchen and wast living room.
                            </div>
                            <div className="submain-description_item"> 
                                <img src="css/img/mountain-show.jpg" alt="room"></img>
                                10 min from the nearest mountain trail says all about location, but we 
                                also offer modern and new mountain bike as well cars for rent if you plan
                                longer trip.
                            </div>
                            <div className="submain-description_item"> 
                                <img src="css/img/meal-show.jpg" alt="room"></img>
                                Aside from accomodation we offer meals created by our chefs that don't yield to 
                                those in renowned restaurants across the world.
                            </div>
                        </div>
                    </section>
                    <section className="rooming">
                        <Link to="/offer" onClick={() => this.props.accomodationRoom(0)}>
                            <img src="css/img/2-room.jpg" alt="room"
                                onMouseEnter={() => this.setState({ firstImg: false })}
                                onMouseLeave={() => this.setState({ firstImg: true })}
                            />
                            <div className={this.state.firstImg ? "photo-description" : "more-info-btn"}>
                                {this.renderPhotoDescritpion(this.state.firstImg, <p>two-person room</p>)}
                            </div>
                        </Link>
                        <Link to="/offer" onClick={() => this.props.accomodationRoom(1)}>
                            <img src="css/img/4-house.jpg" alt="room"    
                                onMouseEnter={() => this.setState({ secondImg: false })}
                                onMouseLeave={() => this.setState({ secondImg: true })}
                            />
                            <div className={this.state.secondImg ? "photo-description" : "more-info-btn"}>
                                {this.renderPhotoDescritpion(this.state.secondImg, <p>four-person house</p>)}
                            </div>
                        </Link>
                        <Link className="house-for-2" to="/offer" onClick={() => this.props.accomodationRoom(2)}>
                            <img src="css/img/2-house.jpg" alt="room"
                                onMouseEnter={() => this.setState({ thirdImg: false })}
                                onMouseLeave={() => this.setState({ thirdImg: true })}
                            />
                            <div className={this.state.thirdImg ? "photo-description" : "more-info-btn"}>
                            {this.renderPhotoDescritpion(this.state.thirdImg, <p>two-person house</p>)}
                            </div>
                        </Link>
                        <Link to="/offer" onClick={() => this.props.accomodationRoom(3)}>
                            <img src="css/img/premium-house.jpg" alt="room"   
                                onMouseEnter={() => this.setState({ fourthImg: false })}
                                onMouseLeave={() => this.setState({ fourthImg: true })}
                            />
                            <div className={this.state.fourthImg ? "photo-description" : "more-info-btn"}>
                                {this.renderPhotoDescritpion(this.state.fourthImg, <p>Premium house</p>)}
                            </div>
                        </Link>
                        <Link to="/offer" onClick={() => this.props.accomodationRoom(4)}>
                            <img src="css/img/tour-house.jpg" alt="room"
                                onMouseEnter={() => this.setState({ fifthImg:false })}
                                onMouseLeave={() => this.setState({ fifthImg: true })}
                            />
                            <div className={this.state.fifthImg ? "photo-description" : "more-info-btn"}>
                                {this.renderPhotoDescritpion(this.state.fifthImg, <p>Tour house</p>)}
                            </div>
                        </Link>
                    </section>
                </div>
        );
    };
};

const mapStateToProps = state => {
    return { hover: state.headerState };
}

export default connect(mapStateToProps, {
    navChangeStyle, enterMainPage, headerAccepted, leavePage, accomodationRoom 
})(MainPage);