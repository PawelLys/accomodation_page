import React from 'react';
import { connect } from 'react-redux';
import { navChangeStyle, headerAccepted, hoverNav, enterContactPage, leavePage } from '../actions';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.props.navChangeStyle(true);
        this.props.hoverNav(false);
        this.props.headerAccepted(false);
        setTimeout(() => {
            this.props.enterContactPage();
        }, 100);
    };

    state = {  showTechnicalNumber: false, showChiefNumber: false, showGuardianNumber: false};

    componentWillUnmount = () => {
        this.props.leavePage();
    }

    ocupation = ocupation => {
        if(ocupation === 'technical')
            return {
                title: 'technical support',
                description: `Contact our technician for any technical issues, from burned out light to any 
                problems with the equipment.`,
                contact: 123456789
            }
        if(ocupation === 'chief')
            return {
                title: 'head chief',
                description: `Contact our cheief for any question related to meals, from extracurricular dining
                to any issue with served meals.`,
                contact: 987654321
            }
        if(ocupation === 'guardian')
            return {
                title: 'guardian',
                description: `Contact our guardian for any problems related with your accomodation, like losing 
                your key`,
                contact: 123454321
            }
    }

    onBtnContactClick = id => {
        if(id === 'technical support') this.setState({ showTechnicalNumber: true });
        if(id === 'head chief') this.setState({ showChiefNumber: true });
        if(id === 'guardian') this.setState({ showGuardianNumber: true });
    }

    renderNumber = (ocupation, number) => {
        if(this.state.showTechnicalNumber && ocupation === 'technical support') 
            return number
        if(this.state.showChiefNumber && ocupation === 'head chief') 
            return number
        if(this.state.showGuardianNumber && ocupation === 'guardian') 
            return number
        return 'Contact';
    }

    changeClass = ocupation => {
        if(this.state.showTechnicalNumber && ocupation === 'technical support') 
            return '-showed'
        if(this.state.showChiefNumber && ocupation === 'head chief') 
            return '-showed'
        if(this.state.showGuardianNumber && ocupation === 'guardian') 
            return '-showed'
        return '';
    }

    renderContact = ocupation => {
        const details = this.ocupation(ocupation);
        return (
            <div className="contact-elements-context">
                <div className="contact-elements-context-ocupation">{details.title}</div>
                <img src={`css/img/face_${ocupation}.jpg`} alt={ocupation} />
                <p>
                    {details.description}
                </p>
                <div className={`contact-elements-context_number${this.changeClass(details.title)}`} 
                    id={details.title} onClick={(event) => this.onBtnContactClick(event.target.id)}
                >
                    {this.renderNumber(details.title, details.contact)}
                </div>
            </div>
        );
    };

    render() {
        return(
            <section className="contact"> 
                <div className="contact-bgsecondary"></div>
                <div className="contact-bgtertiary"></div>
                <div className="contact-elements">
                    <div className="contact-elements-title">
                        We are here to help
                    </div>
                    <div className="contact-elements-container"/>
                    {this.renderContact('technical')}
                    {this.renderContact('chief')}
                    {this.renderContact('guardian')}
                </div>
            </section>
        );
    };
};


export default connect(null, { 
    navChangeStyle, headerAccepted, hoverNav, enterContactPage, leavePage 
})(Contact);