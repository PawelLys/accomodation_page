import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { navChangeStyle, headerAccepted, hoverNav, enterMessagePage, leavePage } from '../actions';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.props.navChangeStyle(false);
        this.props.hoverNav(false);
        this.props.headerAccepted(true);
        setTimeout(() => {
            this.props.enterMessagePage();
        }, 100);
    };

    state = {  isChecked: true, displayAfterSubmitting: false, phoneNumberDigitsWarning: false  };

    componentWillUnmount = () => {
        this.props.leavePage();
    }

    renderError = meta => meta.touched && meta.error && !meta.active ? meta.error : null;

    renderElement = formProps => {
        const { meta } = formProps;
        if (formProps.input.name === 'email')
            return (
                <div className="form-date_item">
                    Your email:<input type="email" placeholder={this.renderError(meta)} 
                    className={meta.touched && meta.error && !meta.active ? 'red-background' : ''}  
                    {...formProps.input} />
                </div>
            );
        else if(formProps.input.name === 'country') 
            return (
                <div className="form-date_item">
                    Your country of residence:<input type="text" placeholder={this.renderError(meta)} 
                    className={meta.touched && meta.error && !meta.active ? 'red-background' : ''}  
                    {...formProps.input} />
                </div>
            );
        else if(formProps.input.name === 'phoneNumber') 
            return (
                <div className="form-date_item">
                    Your phone number:<input type="number" placeholder={this.renderError(meta)} 
                    className={meta.touched && meta.error && !meta.active ? 'red-background' : ''}  
                    {...formProps.input} />
                    <div className="form-date_item-phonewarning"
                        style={this.renderError(meta) === 'Phone number should have 9 digits' 
                            ? {visibility: 'visible', opacity: '1'} : {visibility: 'hidden', opacity: '0'}
                        }
                    >
                        <span className="iconify" data-icon="ant-design:warning-twotone" data-inline="false"/>
                        {this.renderError(meta)}
                    </div>
                </div>
            );
        else if(formProps.input.name === 'message') 
            return (
                <div className="feedback_form-message">
                    Your message:<textarea type="text" placeholder={this.renderError(meta)} 
                    className={meta.touched && meta.error && !meta.active ? 'red-background' : ''}  
                    {...formProps.input} />
                    <button className="form-btn">Contact us</button>
                </div>
            );
        else 
            return (
                <div className="form-date_item">
                    {formProps.label}<input type="text" placeholder={this.renderError(meta)}
                    className={meta.touched && meta.error && !meta.active ? 'red-background' : ''}
                    {...formProps.input} />
                </div>
            );
    };

    onSubmitBtn = formValues => {
        console.log(formValues);
        this.setState({ displayAfterSubmitting: true });
    };

    displayIntroText = () => {
        if(this.state.displayAfterSubmitting) 
            return (
                <div className="feedback_aftertext">
                    <p>Thank you for message.</p>
                    <p>In the next 24h someone from our staff will get in touch with you.</p>
                    <p>We also would like to inform, that any unserious message or spam will be ignored.</p>
                    <span onClick={() => this.setState({ displayAfterSubmitting: false })}>
                        <ion-icon name="arrow-back"></ion-icon>Return
                    </span>
                </div>
            ) 
        else return (
                <div className="feedback_intro">
                    Any questions? If so then we would gladly clarify everything for you.
                </div>
            );
    }
    
    render() {
        return(
            <section className="feedback"> 
                {this.displayIntroText()}
                <form className="feedback_form" onSubmit={this.props.handleSubmit(this.onSubmitBtn.bind(this))}
                    style={this.state.displayAfterSubmitting ? {display: 'none'} : {}}
                >
                    <div className="form-date">
                        <Field name="firstName" component={this.renderElement} label="Your first name:" />
                        <Field name="lastName" component={this.renderElement} label="Your last name:" />
                        <div className="form-date_item">Your gender: 
                            <div className="form-date_item-gender">
                                <Field name="gender" component="input" type="radio" value="male" 
                                    checked={this.state.isChecked}  onClick={() => this.setState({ isChecked: true })} 
                                />Male
                                <Field name="gender" component="input" type="radio" value="female" 
                                    checked={!this.state.isChecked} onClick={() => this.setState({ isChecked: false })} 
                                />Female
                            </div>
                        </div>
                        <Field name="email" component={this.renderElement} />
                        <Field name="country" component={this.renderElement} />
                        <Field name="phoneNumber" component={this.renderElement} />
                    </div>
                    <Field name="message" component={this.renderElement} />
                </form>
            </section>
        );
    };
};

const validate = formValues => {
    const error = {};

    if(!formValues.firstName) error.firstName = 'Input your first name here';
    if(!formValues.lastName) error.lastName = 'Input your last name here';
    if(!formValues.email) error.email = 'Input your email here';
    if(!formValues.country) error.country = 'Input your country here';
    if(!formValues.phoneNumber) error.phoneNumber = 'Input your phone number here';
    else {
        if(formValues.phoneNumber.length !== 9) error.phoneNumber = 'Phone number should have 9 digits';
    };
    if(!formValues.message) error.message = 'Input your message here';

    return error;
}

const afterSubmit = (result, dispatch) => dispatch(reset('ContactForm'));

const formWrapped = reduxForm({
    form: 'ContactForm', onSubmitSuccess: afterSubmit, validate
})(ContactForm);

export default connect(null, { 
    navChangeStyle, headerAccepted, hoverNav, enterMessagePage, leavePage 
})(formWrapped);