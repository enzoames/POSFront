import { TEAM_PROFILE_REQUEST, TEAM_PROFILE_SUCCESS, TEAM_PROFILE_FAILURE
} from './constants';

const initialState = {
  isFetching: false,
  isLoaded: false,
  profile: null,
};

export default function teamProfile(state = initialState, action = {}) {
  switch (action.type) {
    case TEAM_PROFILE_REQUEST:
      console.log('\nTEAM_PROFILE_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
      });
    case TEAM_PROFILE_SUCCESS:
      console.log('\nTEAM_PROFILE_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        profile: action.result
      });
    case TEAM_PROFILE_FAILURE:
      console.log('\nTEAM_PROFILE_FAILURE', action);
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
  return globalState.teamProfile && globalState.teamProfile.isLoaded;
}

