import {
  CREATE_LEAGUE_REQUEST, CREATE_LEAGUE_SUCCESS, CREATE_LEAGUE_FAILURE,
  EDIT_LEAGUE_REQUEST, EDIT_LEAGUE_SUCCESS, EDIT_LEAGUE_FAILURE,
  LEAGUE_OWNERS_REQUEST, LEAGUE_OWNERS_SUCCESS, LEAGUE_OWNERS_FAILURE,
} from './constants';

const initialState = {
  isPosting: false,
  isLoaded: false,
  result: null,
  error: null,
};

export default function leagueManage(state = initialState, action = {}) {
  switch (action.type) {
    // create new league
    case CREATE_LEAGUE_REQUEST:
      console.log('\nCREATE_LEAGUE_REQUEST', action);
      return Object.assign({}, state, {
        isPosting: true,
        isLoaded: false,
        error: null,
        result: null,
      });
    case CREATE_LEAGUE_SUCCESS:
      console.log('\nCREATE_LEAGUE_SUCCESS', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: true,
        error: null,
        result: action.result,
      });
    case CREATE_LEAGUE_FAILURE:
      console.log('\nCREATE_LEAGUE_FAILURE', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: false,
        error: action.error,
        result: null,
      });
    // edit league
    case EDIT_LEAGUE_REQUEST:
      console.log('\nEDIT_LEAGUE_REQUEST', action);
      return Object.assign({}, state, {
        isPosting: true,
        isLoaded: false,
        error: null,
        result: null,
      });
    case EDIT_LEAGUE_SUCCESS:
      console.log('\nEDIT_LEAGUE_SUCCESS', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: true,
        error: null,
        result: action.result,
      });
    case EDIT_LEAGUE_FAILURE:
      console.log('\nEDIT_LEAGUE_FAILURE', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: false,
        error: action.error,
        result: null,
      });
    // get league owners
    case LEAGUE_OWNERS_REQUEST:
      console.log('\nLEAGUE_OWNERS_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
        error: null,
        result: null,
      });
    case LEAGUE_OWNERS_SUCCESS:
      console.log('\nLEAGUE_OWNERS_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        error: null,
        result: action.result,
      });
    case LEAGUE_OWNERS_FAILURE:
      console.log('\nLEAGUE_OWNERS_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        result: null
      });
    default:
      return state;
  }
}
