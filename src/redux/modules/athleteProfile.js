import { ATHLETE_PROFILE_REQUEST, ATHLETE_PROFILE_SUCCESS, ATHLETE_PROFILE_FAILURE
} from './constants';

const initialState = {
  isFetching: false,
  isLoaded: false,
  profile: null,
};

export default function athleteProfile(state = initialState, action = {}) {
  switch (action.type) {
    case ATHLETE_PROFILE_REQUEST:
      console.log('\nATHLETE_PROFILE_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
      });
    case ATHLETE_PROFILE_SUCCESS:
      console.log('\nATHLETE_PROFILE_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        profile: action.result
      });
    case ATHLETE_PROFILE_FAILURE:
      console.log('\nATHLETE_PROFILE_FAILURE', action);
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
  return globalState.athleteProfile && globalState.athleteProfile.isLoaded;
}

