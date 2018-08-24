import { CREATE_DIVISION_REQUEST, CREATE_DIVISION_SUCCESS, CREATE_DIVISION_FAILURE,
  EDIT_DIVISION_REQUEST, EDIT_DIVISION_SUCCESS, EDIT_DIVISION_FAILURE
} from './constants';

const initialState = {
  isPosting: false,
  isLoaded: false,
  result: null,
  error: null,
};

export default function division(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_DIVISION_REQUEST:
      console.log('\nCREATE_DIVISION_REQUEST', action);
      return Object.assign({}, state, {
        isPosting: true,
        isLoaded: false,
        error: null
      });
    case CREATE_DIVISION_SUCCESS:
      console.log('\nCREATE_DIVISION_SUCCESS', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: true,
        result: action.result
      });
    case CREATE_DIVISION_FAILURE:
      console.log('\nCREATE_DIVISION_FAILURE', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: false,
        error: action.error,
      });
    case EDIT_DIVISION_REQUEST:
      console.log('\nEDIT_DIVISION_REQUEST', action);
      return Object.assign({}, state, {
        isPosting: true,
        isLoaded: false,
        error: null
      });
    case EDIT_DIVISION_SUCCESS:
      console.log('\nEDIT_DIVISION_SUCCESS', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: true,
        result: action.result,
      });
    case EDIT_DIVISION_FAILURE:
      console.log('\nEDIT_DIVISION_FAILURE', action);
      return Object.assign({}, state, {
        isPosting: false,
        isLoaded: false,
        error: action.error,
      });
    default:
      return state;
  }
}

// =====================================
// ============== HELPERS ==============
// =====================================

export function isLoaded(globalState) {
  return globalState.division && globalState.division.isLoaded;
}

