import { EXPLORE_LEAGUES_REQUEST, EXPLORE_LEAGUES_SUCCESS, EXPLORE_LEAGUES_FAILURE,
  EXPLORE_TEAMS_REQUEST, EXPLORE_TEAMS_SUCCESS, EXPLORE_TEAMS_FAILURE,
  EXPLORE_ATHLETES_REQUEST, EXPLORE_ATHLETES_SUCCESS, EXPLORE_ATHLETES_FAILURE
} from './constants';

const initialState = {
  isFetchingLeagues: false,
  isFetchingTeams: false,
  isFetchingAthletes: false,
  isLeaguesLoaded: false,
  isTeamsLoaded: false,
  isAthletesLoaded: false,
  exploreLeagues: null,
  exploreTeams: null,
  exploreAthletes: null,
  leagueError: null,
  teamError: null,
  athleteError: null
};

export default function explore(state = initialState, action = {}) {
  switch (action.type) {

    // =====================================
    // ============== LEAGEUS ==============
    // =====================================

    case EXPLORE_LEAGUES_REQUEST:
      console.log('\nEXPLORE_LEAGUES_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingLeagues: true,
        isLeaguesLoaded: false,
      });
    case EXPLORE_LEAGUES_SUCCESS:
      console.log('\nEXPLORE_LEAGUES_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingLeagues: false,
        isLeaguesLoaded: true,
        exploreLeagues: action.result
      });
    case EXPLORE_LEAGUES_FAILURE:
      console.log('\nEXPLORE_LEAGUES_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLeaguesLoaded: false,
        exploreLeagues: null,
        error: action.error
      });

    // ===================================
    // ============== TEAMS ==============
    // ===================================

    case EXPLORE_TEAMS_REQUEST:
      console.log('\nEXPLORE_TEAMS_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingTeams: true,
        isTeamsLoaded: false,
      });
    case EXPLORE_TEAMS_SUCCESS:
      console.log('\nEXPLORE_TEAMS_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingTeams: false,
        isTeamsLoaded: true,
        exploreTeams: action.result
      });
    case EXPLORE_TEAMS_FAILURE:
      console.log('\nEXPLORE_TEAMS_FAILURE', action);
      return Object.assign({}, state, {
        isFetchingTeams: false,
        isTeamsLoaded: false,
        exploreTeams: null,
        teamError: action.error
      });

    // ======================================
    // ============== ATHLETES ==============
    // ======================================

    case EXPLORE_ATHLETES_REQUEST:
      console.log('\nEXPLORE_ATHLETES_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingAthletes: true,
        isAthletesLoaded: false,
      });
    case EXPLORE_ATHLETES_SUCCESS:
      console.log('\nEXPLORE_ATHLETES_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingAthletes: false,
        isAthletesLoaded: true,
        exploreAthletes: action.result
      });
    case EXPLORE_ATHLETES_FAILURE:
      console.log('\nEXPLORE_ATHLETES_FAILURE', action);
      return Object.assign({}, state, {
        isFetchingAthletes: false,
        isAthletesLoaded: false,
        exploreAthletes: null,
        athleteError: action.error
      });

    default:
      return state;
  }
}

// =====================================
// ============== HELPERS ==============
// =====================================

export function isLoaded(globalState) {
  return globalState.explore && (globalState.explore.isLeaguesLoaded || globalState.explore.isTeamsLoaded || globalState.explore.isAthletesLoaded);
}

