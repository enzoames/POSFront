import { TEAM_REQUEST_POSITION_REQUEST, TEAM_REQUEST_POSITION_SUCCESS, TEAM_REQUEST_POSITION_FAILURE
} from './constants';

const initialState = {
  isFetching: false,
  isLoaded: false,
  teams: null,
  error: null,
};

export default function teamRequestPosition(state = initialState, action = {}) {
  switch (action.type) {
    case TEAM_REQUEST_POSITION_REQUEST:
      console.log('\nTEAM_REQUEST_POSITION_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
        error: null,
      });
    case TEAM_REQUEST_POSITION_SUCCESS:
      console.log('\nTEAM_REQUEST_POSITION_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        teams: action.result
      });
    case TEAM_REQUEST_POSITION_FAILURE:
      console.log('\nTEAM_REQUEST_POSITION_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        teams: null
      });
    default:
      return state;
  }
}
