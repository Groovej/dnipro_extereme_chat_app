import 'whatwg-fetch'
import { push } from "react-router-redux"

const pathResolver = {
  'authenticate': '/multistep',
  'reset': '/signup'
}

const signMeUp = params => {
  return dispatch => {
    fetch('/Register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify(params)
        })
    .catch(response => {
      dispatch({ type: 'USER_ERROR' })
    })
    .then( response => response.json() )
    .then( ({ error, success }) => {
        if (error) {
          dispatch({ type: 'USER_ERROR', payload: error })
        } else {
          dispatch(push(`/verify`))
        }
    })

    dispatch({
      type: 'GET_REQUEST'
    })
  }
}

const verifyUser = ({ data, redirecTAction }) => {
  return dispatch => {
    fetch('/Verify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify(data)
        })
    .catch(response => {
      dispatch({ type: 'USER_ERROR' })
    })
    .then( response => response.json() )
    .then( ({ error, success }) => {
        if (error) {
          dispatch({ type: 'USER_ERROR', payload: error })
          dispatch( push(`/verify`) )
        } else {
          debugger

          if (redirecTAction) {
            dispatch({ type: 'USER_PASSWORD_RESETED', payload: redirecTAction })
          }

          const path = redirecTAction ? pathResolver[redirecTAction] : '/signin'
          dispatch( push(path) );
        }
    })

    dispatch({
      type: 'GET_REQUEST'
    })
  }
}

const getToken = ({ phone, redirecTAction }) => {
  return dispatch => {
    fetch('/getToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({ phone })
        })
    .catch(response => {
      dispatch({ type: 'USER_ERROR' })
    })
    .then( response => response.json() )
    .then( ({ error, success }) => {
        if (error) {
          dispatch({ type: 'USER_ERROR', payload: error })
          dispatch( push(`/signin`) )
        } else {
          dispatch({ type: 'USER_ACTION', payload: redirecTAction })
          dispatch(push('/verify'));
        }
    })

    dispatch({
      type: 'GET_REQUEST'
    })
  }
}

const authenticateMe = ({ params, redirecTAction }) => {
  return dispatch => {
    fetch('/Authenticate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify(params)
        })
    .catch(response => {
      dispatch({ type: 'USER_ERROR' })
    })
    .then( response => response.json() )
    .then( ({ error, success }) => {
        if (error) {
          dispatch({ type: 'USER_ERROR', payload: error })
          dispatch( push(`/signin`) )
        } else {
          dispatch({ type: 'USER_ACTION', payload: redirecTAction })
          dispatch(push(`/verify`))
        }
    })

    dispatch({
      type: 'GET_REQUEST'
    })
  }
}

const notSignedIn = () => {
  return dispatch => {
    dispatch({ type: 'USER_ERROR', payload: 'You Are NOT signed IN!!!' })
    dispatch( push(`/signin`) )
  }
}

const resetPassword = ({ phone }) => {
  return dispatch => {
    fetch('/Reset',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({ phone })
        })
    .catch(response => {
      dispatch({ type: 'USER_ERROR' })
    })
    .then( response => response.json() )
    .then( ({ error, success }) => {
        if (error) {
          dispatch({ type: 'USER_ERROR', payload: error })
          dispatch( push(`/signin`) )
        } else {
          dispatch({ type: 'USER_PASSWORD_RESETED' })
          dispatch(push(`/signup`))
        }
    })

    dispatch({
      type: 'GET_REQUEST'
    })
  }
}

export { signMeUp, verifyUser, authenticateMe, notSignedIn, resetPassword, getToken }
