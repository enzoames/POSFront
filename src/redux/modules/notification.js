import { FETCH_ATHLETE_NOTIFICATIONS_REQUEST, FETCH_ATHLETE_NOTIFICATIONS_SUCCESS, FETCH_ATHLETE_NOTIFICATIONS_FAILURE,
  PUT_ATHLETE_NOTIFICATIONS_REQUEST, PUT_ATHLETE_NOTIFICATIONS_SUCCESS, PUT_ATHLETE_NOTIFICATIONS_FAILURE,
  FETCH_TEAMCAPTAIN_NOTIFICATIONS_REQUEST, FETCH_TEAMCAPTAIN_NOTIFICATIONS_SUCCESS, FETCH_TEAMCAPTAIN_NOTIFICATIONS_FAILURE,
} from './constants';

const initialState = {
  //athlete
  isANotificationFetching: false,
  isANotificationLoaded: false,
  isANotificationPosting: false,
  athleteNotifications: null,
  //team
  isTNotificationFetching: false,
  isTNotificationLoaded: false,
  isTNotificationPosting: false,
  teamNotifications: null,
  //league
  isLNotificationFetching: false,
  isLNotificationLoaded: false,
  isLNotificationPosting: false,
  leagueNotifications: null,
  // all errors
  error: null,
};

export default function notification(state = initialState, action = {}) {
  switch (action.type) {

    // =============================
    // ======= FETCH ATHLETE =======
    // =============================

    case FETCH_ATHLETE_NOTIFICATIONS_REQUEST:
      console.log('\nFETCH_ATHLETE_NOTIFICATIONS_REQUEST', action);
      return Object.assign({}, state, {
        isANotificationFetching: true,
        isANotificationLoaded: false,
        athleteNotifications: null
      });
    case FETCH_ATHLETE_NOTIFICATIONS_SUCCESS:
      console.log('\nFETCH_ATHLETE_NOTIFICATIONS_SUCCESS', action);
      return Object.assign({}, state, {
        isANotificationFetching: false,
        isANotificationLoaded: true,
        athleteNotifications: action.result[0]
      });
    case FETCH_ATHLETE_NOTIFICATIONS_FAILURE:
      console.log('\nFETCH_ATHLETE_NOTIFICATIONS_FAILURE', action);
      return Object.assign({}, state, {
        isANotificationFetching: false,
        isANotificationLoaded: false,
        error: action.error,
        athleteNotifications: null
      });

    // ============================
    // ======= PUT ATHLETE  =======
    // ============================

    case PUT_ATHLETE_NOTIFICATIONS_REQUEST:
      console.log('\nPUT_ATHLETE_NOTIFICATIONS_REQUEST', action);
      return Object.assign({}, state, {
        isANotificationPosting: true,
        isANotificationLoaded: false,
        athleteNotifications: null
      });
    case PUT_ATHLETE_NOTIFICATIONS_SUCCESS:
      console.log('\nPUT_ATHLETE_NOTIFICATIONS_SUCCESS', action);
      return Object.assign({}, state, {
        isANotificationPosting: false,
        isANotificationLoaded: true,
        athleteNotifications: action.result
      });
    case PUT_ATHLETE_NOTIFICATIONS_FAILURE:
      console.log('\nPUT_ATHLETE_NOTIFICATIONS_FAILURE', action);
      return Object.assign({}, state, {
        isANotificationPosting: false,
        isANotificationLoaded: false,
        error: action.error,
        athleteNotifications: null
      });

    
    // ==================================
    // ======= FETCH TEAM CAPTAIN =======
    // ==================================

    case FETCH_TEAMCAPTAIN_NOTIFICATIONS_REQUEST:
      console.log('\nFETCH_TEAMCAPTAIN_NOTIFICATIONS_REQUEST', action);
      return Object.assign({}, state, {
        isTNotificationFetching: true,
        isTNotificationLoaded: false,
        teamNotifications: null
      });
    case FETCH_TEAMCAPTAIN_NOTIFICATIONS_SUCCESS:
      console.log('\nFETCH_TEAMCAPTAIN_NOTIFICATIONS_SUCCESS', action);
      return Object.assign({}, state, {
        isTNotificationFetching: false,
        isTNotificationLoaded: true,
        teamNotifications: action.result
      });
    case FETCH_TEAMCAPTAIN_NOTIFICATIONS_FAILURE:
      console.log('\nFETCH_TEAMCAPTAIN_NOTIFICATIONS_FAILURE', action);
      return Object.assign({}, state, {
        isTNotificationFetching: false,
        isTNotificationLoaded: false,
        error: action.error,
        teamNotifications: null
      });

    default:
      return state;
  }
}

// =====================================
// ============== HELPERS ==============
// =====================================

export function isLoaded(globalState) {
  return globalState.notification && globalState.stats.notification;
}

