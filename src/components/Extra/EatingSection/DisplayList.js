import React from 'react';
import { connect } from 'react-redux';
import { fetchRecipe, pageNumber } from '../../actions';

class DisplayList extends React.Component {

    renderList = () => {
        if(this.props.apiResponseList.length > 0) {

            if(this.props.apiResponseList === 'err') return (
                <div style={{ fontSize: '2.5rem', color: '#fff', gridColumn: '1/ span 3', margin: '10vh 15vw', 
                    textAlign: 'center' }}
                >
                    Sorry, seems like there is problem with server.
                </div>
                );
            if(this.props.apiResponseList === 'ingErr') return (
                <div style={{ fontSize: '2.5rem', color: '#fff', gridColumn: '1/ span 3', margin: '10vh 15vw', 
                    textAlign: 'center' }}
                >
                    Sorry, we don't serve anything with that ingridient.
                </div>
                );

            const list = this.props.apiResponseList.map(curr => {
                return (
                    <div className="meals-list-item" 
                    id={curr.recipe_id} 
                    key={curr.recipe_id} 
                    onClick={event => this.catchEventID(event)}
                    >
                        <div className="meals-list-item_photo">
                            <img src={curr.image_url} alt="Food"/>
                        </div>
                        <div className="meals-list-item_title">{this.limitRecipeTitle(curr.title)}</div>
                    </div> 
                );
            });

            if(this.props.page === 0) this.props.pageNumber(1);

            if(this.props.page === 1) return list.slice(0, 15);
            if(this.props.page === 2) return list.slice(15, 30);

            return null;
        } else {
            return (
                <div className="meals-intro">
                    {this.props.clickBtn 
                        ? <div className="loader"/> 
                        :   <span>
                                Here you can choose and plan what meals to order from our rich menu.<br/>
                                Our chef will cook this all for you.
                            </span>
                    }
                </div>
            )
        };
    };

    limitRecipeTitle = (title, limit = 45) => {
        const newTitle = [];
        let acc = 0;
        if(title.length > limit) {
            [...title.split(' ')].forEach(cur => {
                if(acc + cur.length <= limit) {
                    acc += cur.length;
                    newTitle.push(cur);
                }
            });
            return `${newTitle.join(' ')} ...`;
        } else return title;
    }

    catchEventID = event => {
        let elementID = event.target.id;
        if(!elementID) elementID = event.target.parentNode.id;
        if(elementID) this.props.fetchRecipe(event.target.id)
    };

    renderPageBtn = () => {
        if(this.props.page === 1 && this.props.apiResponseList.length > 15) return (
            <div className="meals-list_btn-right" onClick={() => this.props.pageNumber(2)}>
                Next page<ion-icon name="arrow-round-forward"></ion-icon>
            </div>
        );
        if(this.props.page === 2) return (
            <div className="meals-list_btn-left" onClick={() => this.props.pageNumber(1)}>
                <ion-icon name="arrow-round-back"></ion-icon>Previous page
            </div>
        );

        return null;
    }

    render() {
        if(Object.keys(this.props.recipeDetail).length > 0) return <div></div>;
        return <div className="meals-list">{this.renderList()}{this.renderPageBtn()}</div>; 
    };
}

const mapStateToProps = state => {
    return { apiResponseList: state.listRequest, recipeDetail: state.recipeRequest, page: state.pageNumber };
};

export default connect(mapStateToProps, {
    fetchRecipe, pageNumber
})(DisplayList);