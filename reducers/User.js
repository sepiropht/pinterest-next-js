import { LOGGED_IN, LOGGED_OUT } from "../actions/User";
const initialState = {
  logged: false
};

function User(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, { logged: true }, action.payload);
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}

export default User;
