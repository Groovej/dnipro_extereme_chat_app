const initialState = {
  fetching: false,
  error: false
}

const Users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, fetching: true, error: false }
    case 'SIGN_UP_USER_EROR':
      return { ...state, fetching: false, error: action.payload }
    default:
      return state;
  }
}

export default Users
