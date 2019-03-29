import React, { Fragment } from 'react'
import ReactTelInput from "react-telephone-input"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as UserActions from '../actions/user'

class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      phone: '',
      phoneInvalid: false,
      onPattern: false,
      phoneToShort: false,
      password: '',
      touched: false,
      passwordEmpty: false,
    }
    this.password = React.createRef()
    this.phone = React.createRef()
    this.phoneNumberChanged = this.phoneNumberChanged.bind(this)
    this.authenticateMe = this.authenticateMe.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
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
    if (this.phone.current.__domNode.firstElementChild.value.length > 17) {
      phone = this.phone.current.__domNode.firstElementChild.value.slice(0, 17)
      this.phone.current.__domNode.firstElementChild.value = phone
    }

    this.setState({ phone, ...props })
  }

  authenticateMe(){
    const { phone, password } = this.state
    let passwordValue = password
    if (this.password.current.value.trim().length > password.trim().length) {
      passwordValue = this.password.current.value.trim()
    }
    let props = { touched: true, ...this.validatePhone(phone) }
    if (passwordValue.length === 0) {
      props.passwordEmpty = true
    } else {
      props.passwordToShort = passwordValue.length < 6
      props.passwordEmpty = passwordValue.length === 0
    }

    const allValid = Object.keys(props).filter( (key) => props[key] )
    if (allValid[0] === 'touched' && allValid.length === 1) {
      this.props.userActions.authenticateMe({ params: { phone, password: passwordValue}, redirecTAction: 'authenticate' })
    } else {
      this.setState(props)
    }

    return false
  }

  resetPassword(){
    const { phone } = this.state
    let props = { touched: true, ...this.validatePhone(phone) }
    const allValid = Object.keys(props).filter( (key) => props[key] )
    if (allValid[0] === 'touched' && allValid.length === 1) {
      this.props.userActions.getToken({ ...{ phone }, redirecTAction: 'reset' })
    } else {
      this.setState(props)
    }
  }

  render(){
    const { fetching, error } = this.props.user
    const { phoneInvalid, onPattern, phoneToShort, touched, passwordEmpty, passwordToShort, phone } = this.state
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
    if (phone.length !== 0) {
      telInputProps.value = phone
    }
    const passwordWithError = touched && passwordEmpty

    return (
      <Fragment>
        { fetching &&
          <div className="loader">
            <img src="images/sunny.svg" />
          </div>
        }
        { error &&
          <p className="alert alert-error">{ error || 'Somethig went wrong, please reload the page.' }</p>
        }
        <div className="container">
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
            <button className="button-success" onClick={this.authenticateMe}> Authenticate </button>
            <button className="button-warning margin-left2" onClick={this.resetPassword}> Reset Password </button>
          </div>
          <div className="container app-footer">
            <h6> Not registered? Register Now </h6>
            <Link to='/signup' >
              <button className="button-primary"> Sign Up </button>
            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
