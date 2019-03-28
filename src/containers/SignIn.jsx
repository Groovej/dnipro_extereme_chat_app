import React from 'react'
import { Link } from 'react-router-dom'
import ReactTelInput from "react-telephone-input"

class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.phoneNumberChanged = this.phoneNumberChanged.bind(this)
  }

  phoneNumberChanged(){

  }

  render(){
    const onlyUACountry = Object.assign({}, {name: 'Ukraine (Україна)'} , {iso2: 'ua'}, {dialCode: '380'}, {format: '+...(..)...-..-..' })
    const telInputProps = {
      inputProps: { autoFocus: true },
      defaultCountry: 'ua',
      preferredCountries: ['ua'],
      onChange: this.phoneNumberChanged,
      flagsImagePath: '/images/flags.png'
    }

    return (
      <div className="container">
        <br/>
        <br/>
        <div className="row">
          <div className="six columns">
            <label> Your phone number </label>
            <div>
              <img alt="UA" className="input-flag" src="/images/ua.svg" />
              <ReactTelInput {...telInputProps}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label> Your Password </label>
            <input className="u-full-width" type="password" placeholder="You Password" />
          </div>
        </div>
        <div className="container app-footer">
          <h6> Not registered? Register Now </h6>
          <Link to='/signup' >
            <button className="button-primary"> Sign Up </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default SignIn
