import React, { Fragment } from 'react'
import ReactTelInput from "react-telephone-input"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../actions/user'

class SignUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      phone: '',
      phoneInvalid: false,
      onPattern: false,
      phoneToShort: false,
      password: '',
      passwordConfirmation: '',
      touched: false,
      passwordEmpty: false,
      passwordConfirmationEmpty: false,
      passwordConfirmationDontMatch: false,
      passwordToShort: false
    }
    this.phoneNumberChanged = this.phoneNumberChanged.bind(this)
    this.passwordChanged = this.passwordChanged.bind(this)
    this.passwordConfirmationChanged = this.passwordConfirmationChanged.bind(this)
    this.password = React.createRef()
    this.passwordConfirmation = React.createRef()
    this.phone = React.createRef()
    this.submitForm = this.submitForm.bind(this)
    this.validatePhone = this.validatePhone.bind(this)
  }

  validatePhone(value){
    let params = { phoneInvalid: false, phoneToShort: false, onPattern: false }
    if (value.startsWith('+380')) {
      if (value.slice(3).length !== 14) {
        params.phoneInvalid = true
        params.phoneToShort = true
      }
    } else {
      params.phoneInvalid = true
      params.onPattern = true
    }
    return params
  }

  phoneNumberChanged(phone){
    const { touched } = this.state
    let props = {}
    if (touched) {
      props = this.validatePhone(phone)
    }
    this.setState({ phone, ...props })
  }

  passwordChanged(){
    const password = this.password.current.value.trim()
    this.setState({ password })
  }

  passwordConfirmationChanged(){
    const passwordConfirmation = this.passwordConfirmation.current.value.trim()
    this.setState({ passwordConfirmation })
  }

  submitForm(){
    const { phone, password, passwordConfirmation } = this.state
    let passwordValue = password
    if (this.password.current.value.trim().length > password.trim().length) {
      passwordValue = this.password.current.value.trim()
    }
    const phoneInputValue = this.phone.current.__domNode.firstElementChild.value
    let props = { touched: true, ...this.validatePhone(phone) }
    if (password.length === 0 || this.password.current.value.trim().length === 0) {
      props.passwordEmpty = true
    } else {
      props.passwordToShort = passwordValue.length < 6
      props.passwordEmpty = passwordValue.length === 0
    }
    if (passwordConfirmation.length === 0 || this.passwordConfirmation.current.length === 0) {
      props.passwordConfirmationEmpty = true
    } else {
      props.passwordConfirmationDontMatch = password !== passwordConfirmation
      props.passwordConfirmationEmpty = passwordConfirmation.length === 0
    }

    const allValid = Object.keys(props).filter( (key) => props[key] )
    if (allValid[0] === 'touched' && allValid.length === 1) {
      this.props.userActions.signMeUp({ phone, passowrd: passwordValue })
    } else {
      this.setState(props)
    }

    return false
  }

  render(){
    const { fetching, error } = this.props.user
    const { phoneInvalid, onPattern, phoneToShort, touched, passwordEmpty,
      passwordConfirmationEmpty, passwordConfirmationDontMatch, passwordToShort } = this.state
    const onlyUACountry = Object.assign({}, {name: 'Ukraine (Україна)'} , {iso2: 'ua'}, {dialCode: '380'}, {format: '+...(..)...-..-..' })
    const telInputProps = {
      inputProps: { autoFocus: true },
      defaultCountry: 'ua',
      preferredCountries: ['ua'],
      onChange: this.phoneNumberChanged,
      flagsImagePath: 'images/flags.png',
      ref: this.phone,
      className: phoneInvalid ? 'with-error' : ''
    }
    const passwordConfirmationWithError = touched && (passwordConfirmationEmpty || passwordConfirmationDontMatch)
    const passwordWithError = touched && (passwordEmpty || passwordToShort)

    return (
      <Fragment>
        { fetching &&
          <div className="loader">
            <img src="images/sunny.svg" />
          </div>
        }
        <div className="container">
          { error &&
            <p className="alert alert-error">{ error || 'Somethig went wrong, please reload the page.' }</p>
          }
          <br/>
          <br/>
          <div className="row">
            <div className="six columns">
              <label> Your phone number </label>
              <div>
                <img alt="UA" className="input-flag" src="images/ua.svg" />
                <ReactTelInput {...telInputProps}/>
                { onPattern &&
                  <span className='with-error'> Please, set the phone number on +380.... format </span>
                }
                { phoneToShort &&
                  <span className='with-error'> Not enaugh symbols, try again </span>
                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <label> Your Password </label>
              <input className={`u-full-width ${ passwordWithError ? 'with-error' : '' }`} type="password" placeholder="You Password" onChange={this.passwordChanged} ref={this.password}/>
              { touched && passwordEmpty &&
                <span className='with-error'> Password is empty. </span>
              }
              { touched && passwordToShort &&
                <span className='with-error'> Password should be more or equal 6 characters. </span>
              }
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <input className={`u-full-width ${ passwordConfirmationWithError ? 'with-error' : '' }`} type="password" placeholder="Confirm Password" onChange={this.passwordConfirmationChanged} ref={this.passwordConfirmation}/>
                { touched && passwordConfirmationEmpty &&
                  <span className='with-error'> Password Confirmation is empty. </span>
                }
                { touched && passwordConfirmationDontMatch &&
                  <span className='with-error'> Password Confirmation don't match with password field . </span>
                }
            </div>
          </div>
          <div className="container app-footer">
            <button className="button-primary" onClick={this.submitForm}> Register ME </button>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
