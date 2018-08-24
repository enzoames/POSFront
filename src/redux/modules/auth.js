import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, 
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, 
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE,
  ON_BOARDING_REQUEST, ON_BOARDING_SUCCESS, ON_BOARDING_FAILURE,
  UPDATE_NOTIFICATION_REQUEST, UPDATE_NOTIFICATION_SUCCESS, UPDATE_NOTIFICATION_FAILURE,
  CHECK_TOKEN,
} from './constants';


const initialState = {
  isFetching: false,
  isLoaded: false,
  isLogedIn: false,
  isLogedOut: true,
  error: null,
  token: false,
  tokenChecked: false,
  user: {
    id: null,
    credential: null,
    date_of_birth: null,
    email: null,
    first_name: null,
    has_notification: null,
    is_active: null,
    is_admin: null,
    is_staff: null,
    is_superuser: null,
    last_login: null,
    last_name: null,
    league_owner: null,
    request_load: null,
    request_login: null,
    team_owner: null,
    user_athlete: null,
    username: null
  },
};

export default function reducer(state = initialState, action = {}) {

  function userDetails(userState, apiUserResult){
    let tempUserState = userState;
    Object.keys(tempUserState).forEach( (key, value) => {
      if(apiUserResult[key] !== undefined ){ 
        tempUserState[key] = apiUserResult[key];
    }});
    return(tempUserState);
  }

  switch (action.type) {
    // ==================================
    // ============== LOAD ==============
    // ==================================

    case LOAD_USER_REQUEST:
      console.log('\nLOAD_USER_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case LOAD_USER_SUCCESS:
      console.log('\nLOAD_USER_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        isLogedIn: true,
        isLogedOut: false,
        //accessToken: action.result.accessToken,
        // user: action.result
        user: userDetails(initialState.user, action.result)
      });
    case LOAD_USER_FAILURE:
      console.log('\nLOAD_USER_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        user: null
      });

    // ===================================
    // ============== LOGIN ==============
    // ===================================

    case LOGIN_USER_REQUEST:
      console.log('\nLOGIN_USER_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case LOGIN_USER_SUCCESS:
      console.log('\nLOGIN_USER_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        isLogedIn: true,
        isLogedOut: false,
        //accessToken: action.result.accessToken,
        // user: action.result.user
        user: userDetails(initialState.user, action.result.user)
      });
    case LOGIN_USER_FAILURE:
      console.log('\nLOGIN_USER_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error
      }); 
    // ======================================
    // ============== REGISTER ==============
    // ======================================

    case REGISTER_USER_REQUEST:
      console.log('\nREGISTER_USER_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
        error: null,
      });
    case REGISTER_USER_SUCCESS:
      console.log('\nREGISTER_USER_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        // user: action.result,
        user: null, // IF USER IS REGISTERED HE MUST CONFIRM EMAIL BEFORE HAVING ACCESS TO ACCOUNT
        registered: true
        // isLogedIn: true,
        // isLogedOut: false
      });
    case REGISTER_USER_FAILURE:
      console.log('\nREGISTER_USER_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error
      });
    
    // ==========================================
    // ============== VERIFY EMAIL ==============
    // ==========================================

    case VERIFY_EMAIL_REQUEST:
      console.log('\nVERIFY_EMAIL_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    case VERIFY_EMAIL_SUCCESS:
      console.log('\nVERIFY_EMAIL_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        user: action.result,
        isLogedIn: true,
        isLogedOut: false,
      });
    case VERIFY_EMAIL_FAILURE:
      console.log('\nVERIFY_EMAIL_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        user: null
      });

    // =========================================
    // ============== ON BOARDING ==============
    // =========================================

    case ON_BOARDING_REQUEST:
      console.log('\nON_BOARDING_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
      });
    case ON_BOARDING_SUCCESS:
      console.log('\nON_BOARDING_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        // user: action.result
        user: userDetails(initialState.user, action.result)
      });
    case ON_BOARDING_FAILURE:
      console.log('\nON_BOARDING_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        user: null
      });

    // ====================================
    // ============== LOGOUT ==============
    // ====================================

    case LOGOUT_USER_REQUEST:
      console.log('\nLOGOUT_USER_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false, //new
        error: null,
        user: null,
      });
    case LOGOUT_USER_SUCCESS:
      console.log('\nLOGOUT_USER_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        //accessToken: null,
        user: null,
        isLogedIn: false,
        isLogedOut: true
      });
    case LOGOUT_USER_FAILURE:
      console.log('\nLOGOUT_USER_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error
      });

    // ==========================================
    // ============== NOTIFICATION ==============
    // ==========================================

    case UPDATE_NOTIFICATION_REQUEST:
      console.log('\nUPDATE_NOTIFICATION_REQUEST', action);
      return Object.assign({}, state, {
      });

    case UPDATE_NOTIFICATION_SUCCESS:
      console.log('\nUPDATE_NOTIFICATION_SUCCESS', action);
      return Object.assign({}, state, {
        user: userDetails(initialState.user, action.result)
      });
    case UPDATE_NOTIFICATION_FAILURE:
      console.log('\nUPDATE_NOTIFICATION_FAILURE', action);
      return Object.assign({}, state, {
        error: action.error
      });

    // =========================================
    // ============== CHECK TOKEN ==============
    // =========================================

    case CHECK_TOKEN:
      console.log('\nCHECK_TOKEN', action);
      if(localStorage && localStorage.getItem('id_token') && localStorage.getItem('id_token') !== 'null'){
        console.log('TOKEN', localStorage.getItem('id_token'));
        return Object.assign({}, state, {
          token: true,
          tokenChecked: true
        });
      }
      else{
        return Object.assign({}, state, {
          token: false,
          tokenChecked: true
        });
      }

    default:
      return state;
  }
}

// =====================================
// ============== HELPERS ==============
// =====================================

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.isLoaded;
}

export function isTokenChecked(globalState) {
  return globalState.auth && globalState.auth.tokenChecked;
}


