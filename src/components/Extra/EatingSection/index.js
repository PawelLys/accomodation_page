import React from 'react';
import { connect } from 'react-redux';
import { fetchSearch, pageNumber, deleteFetchAll, navChangeStyle, headerAccepted, hoverNav, 
    enterMealsPage, leavePage, fetchSearchNotSuccesful } from '../../actions';
import DisplayList from './DisplayList';
import DisplayDetail from './DisplayDetail';

class EatingSection extends React.Component {
    constructor(props) {
        super(props);
        this.props.navChangeStyle(false);
        this.props.hoverNav(false);
        this.props.headerAccepted(true);
        setTimeout(() => {
            this.props.enterMealsPage();
        }, 100);
    };

    componentWillUnmount = () => {
        this.props.leavePage();
        this.props.clearData();
        this.props.pageNumber(0);

    }

    state = { inputValue: '', btnClicked: false };

    onBtnClick = () => {
        if(this.state.inputValue !== '') {
            this.props.clearData();
            this.props.pageNumber(0);
            this.props.findList(this.state.inputValue);
            this.setState({ inputValue: '', btnClicked: true });
            setTimeout(() => {
                if(this.props.apiResponseList.length === 0)
                    this.props.fetchSearchNotSuccesful(); 
            }, 5000);
        }
    }

    render() {
        return (
            <section className="meals">
                <div className="meals-header">
                    <input type="text" placeholder="What do you want to eat?" 
                        value={this.state.inputValue}
                        onChange={event => this.setState({ inputValue: event.target.value })}
                    />
                    <button onClick={() => this.onBtnClick()}>Search</button>
                </div>
                <DisplayList clickBtn={this.state.btnClicked} />
                <DisplayDetail />
            </section>
        );
    }
};

const mapStateToProps = state => {
    return { apiResponseList: state.listRequest };
}

export default connect(mapStateToProps, {
    findList: fetchSearch, clearData: deleteFetchAll, pageNumber, navChangeStyle, headerAccepted, 
    hoverNav, enterMealsPage, leavePage, fetchSearchNotSuccesful 
})(EatingSection);