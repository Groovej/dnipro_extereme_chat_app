Иimport React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserActions from '../actions/user'

class Verify extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      smsToken: '',
      touched: false
    }
    this.verifyChanged = this.verifyChanged.bind(this)
    this.verifyMe = this.verifyMe.bind(this)
    this.verification = React.createRef()
  }

  componentWillReceiveProps({user}){
    if (user.error) {
      this.verification.current.value = ''
    }
  }

  verifyChanged(){
    const smsToken = this.verification.current.value.trim()
    this.setState({ smsToken })
  }

  verifyMe(){
    const smsToken = this.verification.current.value.trim()
    if ( smsToken.length === 0 ) {
      this.setState({ touched: true })
    } else {
      this.props.userActions.verifyUser({ sms: smsToken })
    }
  }

  render(){
    const { smsToken, touched } = this.state
    const { error } = this.props.user
    return (
      <div className="container">
        <br />
        <br />
        <br />
        { error &&
          <p className="alert alert-error">{ error || 'Somethig went wrong, please reload the page.' }</p>
        }
        <div className="row">
          <div className="six columns">
            <label> Verification Token form sms </label>
            <input className="u-full-width" type="text" placeholder="sms token...." ref={this.verification} onChange={this.verifyChanged}/>
            { touched && smsToken.lentgh === 0 &&
              <span className='with-error'> This field is required!!! </span>
            }
          </div>
        </div>
        <div className="container app-footer">
          <button className="button-primary" onClick={this.verifyMe}> Verify </button>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Verify);
