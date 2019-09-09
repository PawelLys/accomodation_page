import React from 'react';
import { connect } from 'react-redux';
import { navChangeStyle, headerAccepted, enterStaffSubpage, leavePage, hoverNav } from '../actions';

class LocationStaffPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={boardHover: null, mousePositionX: 0};
        this.props.navChangeStyle(true);
        this.props.headerAccepted(false);
        this.props.hoverNav(false);
        setTimeout(() => {
            this.props.enterStaffSubpage();
        }, 100);
        setTimeout(() => {
            this.setState({ startPage: true });
        }, 300);
    };

    componentWillUnmount() {
        this.props.leavePage();
    };

    leftBoardOnMouseLeave = () => {
        if(this.state.rightBoard !== 'right')
            this.setState({ boardHover: null });
    };

    rightBoardOnMouseLeave = () => {
        if(this.state.rightBoard !== 'left')
            this.setState({ boardHover: null });
    };

    _onMouseMove(e) {
        this.setState({ mousePositionX: Math.floor(e.screenX / window.innerWidth * 100) });
    }

    //
    render() {
        const { mousePositionX } = this.state;
        if(this.props.isMobile)
            return (
                <section className="mobile_staff">
                    <div className="mobile_staff-ceo">
                        <img src="css/img/board_1.png" alt="ceo_1" style={{marginTop: '5rem'}} />
                        <div className="mobile_staff-ceo-info">
                            <div className="mobile_staff-ceo-info-name">Piotr Kowalski</div>
                            <div className="mobile_staff-ceo-info-title">President</div>
                            <div className="mobile_staff-ceo-info-description">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                Aenean commodo ligula eget dolor. Aenean massa. 
                                Cum sociis natoque penatibus et magnis dis parturient montes, 
                                nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                                pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                            </div>
                        </div>
                    </div>
                    <div className="mobile_staff-ceo">
                        <div className="mobile_staff-ceo-info">
                            <div className="mobile_staff-ceo-info-name">Anna Kowalska</div>
                            <div className="mobile_staff-ceo-info-title">Vice President</div> 
                            <div className="mobile_staff-ceo-info-description">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                Aenean commodo ligula eget dolor. Aenean massa. 
                                Cum sociis natoque penatibus et magnis dis parturient montes, 
                                nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                                pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                            </div>
                        </div>
                        <img src="css/img/board_2.png" alt="ceo_2" />
                    </div>
                </section>
            )
        else
            return (
                <div>
                    <section className="staff">
                        <div className="staff-board" onMouseMove={this._onMouseMove.bind(this)}>
                            <div 
                                className={`staff-board_ceo ${this.state.boardHover === null 
                                    ? '' 
                                    : this.state.boardHover === 'left' ? 'hovered' : 'not_hovered'}`}
                                onMouseEnter={() => this.setState({ boardHover: 'left' })}
                                onMouseLeave={this.leftBoardOnMouseLeave}
                                style={this.state.boardHover === null 
                                    ? {width: '50%', opacity: '1', transition: 'width .5s'} 
                                    : this.state.boardHover === 'left' 
                                        ? {width: `${(75 - mousePositionX * 0.5)}%`, opacity: '1', transition: 'width .2s'}
                                        : {width: `${(75 - mousePositionX * 0.5)}%`, opacity: 1.85 - mousePositionX / 100 * 2, 
                                            transition: 'width .2s'}}
                            >
                                <img src="css/img/board_1.png" alt="ceo_1" />
                                <div className="staff-board_ceo-name ceo-name">Piotr Kowalski</div>
                                <div className="staff-board_ceo-title ceo-title">President</div>
                                <div
                                    className="staff-board_ceo-description ceo-description"
                                    style={this.state.boardHover === 'left' && mousePositionX < 16 
                                        ? {opacity: '1'} : {opacity: '0'}}
                                >
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                    Aenean commodo ligula eget dolor. Aenean massa. 
                                    Cum sociis natoque penatibus et magnis dis parturient montes, 
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                                    pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                </div>
                            </div>
                            <div 
                                className={`staff-board_ceo-vice ${this.state.boardHover === null 
                                    ? '' 
                                    : this.state.boardHover === 'right' ? 'hovered' : 'not_hovered'}`}
                                onMouseEnter={() => this.setState({ boardHover: 'right' })}
                                onMouseLeave={this.rightBoardOnMouseLeave}
                                style={this.state.boardHover === null ? {width: '50%', opacity: '1', transition: 'width .5s'} 
                                    : this.state.boardHover === 'left'
                                        ? {opacity: mousePositionX / 50 - .15, width: `${25 + mousePositionX * 0.5}%`, 
                                            transition: 'width .2s'}
                                        : {width: `${25 + mousePositionX * 0.5}%`, opacity: '1', transition: 'width .2s'}}
                            >
                                <div className="staff-board_ceo-vice-name ceo-name">Anna Kowalska</div>
                                <img src="css/img/board_2a.png" alt="ceo_2" />
                                <div className="staff-board_ceo-vice-title ceo-title">Vice President</div>
                                <div
                                    className="staff-board_ceo-description ceo-description"
                                    style={this.state.boardHover === 'right' && mousePositionX > 76 
                                        ? {opacity: '1'} : {opacity: '0'}}
                                >
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                    Aenean commodo ligula eget dolor. Aenean massa. 
                                    Cum sociis natoque penatibus et magnis dis parturient montes, 
                                    nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                                    pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
        );
    };
};

const MapStateToProps = state => {
    return { isMobile: state.isMobile }
}

export default connect(MapStateToProps, {
    navChangeStyle, headerAccepted, enterStaffSubpage, leavePage, hoverNav
})(LocationStaffPage);