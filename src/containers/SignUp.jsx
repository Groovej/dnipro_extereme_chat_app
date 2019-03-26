import React from 'react'
import ReactTelInput from "react-telephone-input"
import { Link } from 'react-router-dom'

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
      passwordConfirmationDontMatch: false
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
    this.setState({ phone, ...this.validatePhone(phone) })
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
    const phoneInputValue = this.phone.current.__domNode.firstElementChild.value
    let props = { touched: true, ...this.validatePhone(phone) }
    if (password.length === 0 || this.password.current.value.trim().length === 0) {
      props.passwordEmpty = true
    }
    if (passwordConfirmation.length === 0 || this.passwordConfirmation.current.length === 0) {
      props.passwordConfirmationEmpty = true
    }
    if (password !== passwordConfirmation) {
      props.passwordConfirmationDontMatch = true
    }

    this.setState(props)
  }

  render(){
    const { phoneInvalid, onPattern, phoneToShort, touched, passwordEmpty,
      passwordConfirmationEmpty, passwordConfirmationDontMatch } = this.state
    const onlyUACountry = Object.assign({}, {name: 'Ukraine (Україна)'} , {iso2: 'ua'}, {dialCode: '380'}, {format: '+...(..)...-..-..' })
    const telInputProps = {
      inputProps: { autoFocus: true },
      defaultCountry: 'ua',
      preferredCountries: ['ua'],
      onChange: this.phoneNumberChanged,
      flagsImagePath: '../../assets/images/flags.png',
      ref: this.phone,
      className: phoneInvalid ? 'with-error' : ''
    }
    const passwordConfirmationWithError = touched && (passwordConfirmationEmpty || passwordConfirmationDontMatch)

    return (
      <div className="container">
        <br/>
        <br/>
        <div className="row">
          <div className="six columns">
            <label> Your phone number </label>
            <div>
              <img alt="UA" className="input-flag" src="../../assets/images/ua.svg" />
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
            <input className={`u-full-width ${ touched && passwordEmpty ? 'with-error' : '' }`} type="password" placeholder="You Password" onChange={this.passwordChanged} ref={this.password}/>
            { touched && passwordEmpty &&
              <span className='with-error'> Password is empty. </span>
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
    )
  }
}

export default SignUp
