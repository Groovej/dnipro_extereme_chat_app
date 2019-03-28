import 'whatwg-fetch'
import { push } from "react-router-redux"

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
      dispatch({ type: 'SIGN_UP_USER_EROR' })
    })
    .then( response => response.json() )
    .then( ({ error, success }) => {
        if (error) {
          dispatch({ type: 'SIGN_UP_USER_EROR', payload: error })
        } else {
          dispatch(push(`/verify`))
        }
    })

    dispatch({
      type: 'GET_REQUEST'
    })
  }
}

const verifyUser = data => {
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
      dispatch({ type: 'SIGN_UP_USER_EROR' })
    })
    .then( response => response.json() )
    .then( ({ error, success }) => {
        if (error) {
          dispatch({ type: 'SIGN_UP_USER_EROR', payload: error })
          dispatch( push(`/verify`) )
        } else {
          debugger
          // dispatch(push(`/verify`))
        }
    })

    dispatch({
      type: 'GET_REQUEST'
    })
  }
}

export { signMeUp, verifyUser }
