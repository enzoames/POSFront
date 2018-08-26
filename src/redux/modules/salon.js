import { LOAD_USER, LOGOUT_USER
} from './constants';

const initialState = {
  user: null,
  loaded: false
};

export default function salon(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER:
      console.log('\nLOAD_USER', action);
      return Object.assign({}, state, {
        user: action.user,
        loaded: true
      });
    case LOGOUT_USER:
      console.log('\nLOGOUT_USER', action);
      return Object.assign({}, state, {
        user: null,
        loaded: false
      });  
    default:
      return state;
  }
}
