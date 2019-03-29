const initialState = {
  fetching: false,
  error: false,
  reset: false
}

const Users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, fetching: true, error: false, reset: false }
    case 'USER_EROR':
      return { ...state, fetching: false, error: action.payload, reset: false }
    case 'USER_PASSWORD_RESETED':
      return { ...state, fetching: false, error: false, reset: true }
    case 'USER_ACTION':
      return { ...state, fetching: false, error: false, reset: false, redirecTAction: action.payload }
    default:
      return state;
  }
}

export default Users
