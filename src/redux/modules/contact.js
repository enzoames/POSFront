import { CONTACT_TEAM_REQUEST, CONTACT_TEAM_SUCCESS, CONTACT_TEAM_FAILURE,
  CONTACT_TEAM_RESET
} from './constants';

const initialState = {
  isFetching: false,
  isLoaded: false,
  data: null,
  error: null,
};

export default function contact(state = initialState, action = {}) {
  switch (action.type) {
    case CONTACT_TEAM_REQUEST:
      console.log('\nCONTACT_TEAM_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
        error: null,
      });
    case CONTACT_TEAM_SUCCESS:
      console.log('\nCONTACT_TEAM_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        data: action.result
      });
    case CONTACT_TEAM_FAILURE:
      console.log('\nCONTACT_TEAM_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        data: null
      });
    case CONTACT_TEAM_RESET:
      console.log('\nCONTACT_TEAM_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: null,
        data: null
      });

    default:
      return state;
  }
}
