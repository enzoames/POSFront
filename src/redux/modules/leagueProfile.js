import { LEAGUE_PROFILE_REQUEST, LEAGUE_PROFILE_SUCCESS, LEAGUE_PROFILE_FAILURE
} from './constants';

const initialState = {
  isFetching: false,
  isLoaded: false,
  profile: null,
  error: null,
};

export default function leagueProfile(state = initialState, action = {}) {
  switch (action.type) {
    case LEAGUE_PROFILE_REQUEST:
      console.log('\nLEAGUE_PROFILE_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
        error: null,
      });
    case LEAGUE_PROFILE_SUCCESS:
      console.log('\nLEAGUE_PROFILE_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        profile: action.result
      });
    case LEAGUE_PROFILE_FAILURE:
      console.log('\nLEAGUE_PROFILE_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        profile: null
      });
    default:
      return state;
  }
}

// =====================================
// ============== HELPERS ==============
// =====================================

export function isLoaded(globalState) {
  return globalState.leagueProfile && globalState.leagueProfile.isLoaded;
}

