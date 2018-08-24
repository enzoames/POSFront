import { FETCH_STATS_REQUEST, FETCH_STATS_SUCCESS, FETCH_STATS_FAILURE,
  FETCH_MATCHGAMES_REQUEST,FETCH_MATCHGAMES_SUCCESS,FETCH_MATCHGAMES_FAILURE
} from './constants';

const initialState = {
  isFetching: false,
  isLoaded: false,
  stats: null,

  isFetchingMatchGames:false,
  isLoadedMatchGames:false,
  matchGames:null
};

   
export default function stats(state = initialState, action = {}) {
  switch (action.type) {
    // =====================================
    // ============== STATS ==============
    // =====================================
    case FETCH_STATS_REQUEST:
      console.log('\nFETCH_STATS_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
        stats: null
      });
    case FETCH_STATS_SUCCESS:
      console.log('\nFETCH_STATS_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        stats: action.result
      });
    case FETCH_STATS_FAILURE:
      console.log('\nFETCH_STATS_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        stats: null
      });
    // =====================================
    // ============== HOMETEAM ==============
    // =====================================
    case FETCH_MATCHGAMES_REQUEST:
      console.log('\nFETCH_MATCHGAMES_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingMatchGames: true,
        isLoadedMatchGames: false
      });
    case FETCH_MATCHGAMES_SUCCESS:
      console.log('\nFETCH_MATCHGAMES_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingMatchGames: false,
        isLoadedMatchGames: true,
        matchGames: action.result
      });
    case FETCH_MATCHGAMES_FAILURE:
      console.log('\nFETCH_MATCHGAMES_FAILURE', action);
      return Object.assign({}, state, {
        isFetchingMatchGames: false,
        isLoadedMatchGames: false,
        error: action.error,
        matchGames: null
      });
    default:
      return state;
  }
}
// =====================================
// ============== HELPERS ==============
// =====================================

export function isLoaded(globalState) {
  return globalState.stats && (globalState.stats.isLoaded || globalState.stats.isLoadedMatchGames);
}

