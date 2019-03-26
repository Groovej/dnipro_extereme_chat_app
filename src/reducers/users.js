const initialState = {
  data: {}
}

const Users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_REQUEST':
      return { ...state }
    default:
      return state;
  }
}

export default Users
