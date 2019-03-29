import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utils/history'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Multistep from './Multistep'
import Verify from './Verify'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <Router history={history}>
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/' component={Multistep} />
          <Route exact path='/verify' component={Verify} />
          <Route exact path='/multistep' component={Multistep} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
