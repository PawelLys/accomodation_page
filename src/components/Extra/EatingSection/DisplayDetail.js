import React from 'react';
import { connect } from 'react-redux';
import { deleteFetchRecipe } from '../../actions';

const DisplayDetail = props => {
    if(props.recipeDetail === 'err') return (
        <div style={{ fontSize: '4rem', color: '#fff', gridColumn: '1/ span 3', margin: '10vh 15vw' }}>
            Sorry, seems like there is problem with server.
        </div>
        );
    else if(Object.keys(props.recipeDetail).length > 0) {  
        const renderIngridiens = props => {
            let id = 0
            return props.recipeDetail.ingredients.map(curr => {
                id++;
                return <div key={id}>{curr}</div>
            });
        };
        return (
            <div className="meals-detail">
                <div className="meals-detail_photo">
                    <img src={props.recipeDetail.image_url} alt="food"/>
                </div>
                <div className="meals-detail_title">{props.recipeDetail.title}</div>
                    <div className="meals-detail_title-ingridiens">
                        {renderIngridiens(props)}
                        <div className="meals-detail_title-ingridiens_btn" onClick={() => props.returnBtn()}>
                            <ion-icon name="arrow-round-back"></ion-icon>Return
                        </div>
                    </div>
            </div>
        );
    }

    return <div></div>
};


const mapStateToProps = state => {
    return { recipeDetail: state.recipeRequest };
}

export default connect(mapStateToProps, {
    returnBtn: deleteFetchRecipe
})(DisplayDetail);