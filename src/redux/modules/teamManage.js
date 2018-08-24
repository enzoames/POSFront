import { FETCH_TEAM_MANAGE_DETAILS_REQUEST, FETCH_TEAM_MANAGE_DETAILS_SUCCESS, FETCH_TEAM_MANAGE_DETAILS_FAILURE,
  REMOVE_DIVISION_ATHLETE_REQUEST, REMOVE_DIVISION_ATHLETE_SUCCESS, REMOVE_DIVISION_ATHLETE_FAILURE,
  INVITE_DIVISION_ATHLETE_REQUEST, INVITE_DIVISION_ATHLETE_SUCCESS, INVITE_DIVISION_ATHLETE_FAILURE,
  INVITE_NEW_DIVISION_ATHLETE_REQUEST, INVITE_NEW_DIVISION_ATHLETE_SUCCESS, INVITE_NEW_DIVISION_ATHLETE_FAILURE,
  CREATE_NEW_TEAM_REQUEST, CREATE_NEW_TEAM_SUCCESS, CREATE_NEW_TEAM_FAILURE,
  INVITE_NEW_DIVISION_ATHLETE_RESET
} from './constants';

const initialState = {
  // manage_details
  isFetching: false,
  isLoaded: false,
  // remove
  isFetchingRemove: false,
  isLoadedRemove: false,
  // invite
  isFetchingInvite: false,
  isLoadedInvite: false,
  // invite new
  isFetchingNewInvite: false,
  isLoadedNewInvite: false,
  errorNewInvite: null,
  // create new team
  isFetchingNewTeam: false,
  isLoadedNewTeam: false,
  errorCreateNewTeam: null,
  // all
  error: null,
  team: null
};

export default function teamManage(state = initialState, action = {}) {
  switch (action.type) {

    // =========================================
    // ======= FETCH TEAM MANAGE DETAILS =======
    // =========================================

    case FETCH_TEAM_MANAGE_DETAILS_REQUEST:
      console.log('\nFETCH_TEAM_MANAGE_DETAILS_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
        isLoaded: false,
        error: null
      });
    case FETCH_TEAM_MANAGE_DETAILS_SUCCESS:
      console.log('\nFETCH_TEAM_MANAGE_DETAILS_SUCCESS', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        team: action.result
      });
    case FETCH_TEAM_MANAGE_DETAILS_FAILURE:
      console.log('\nFETCH_TEAM_MANAGE_DETAILS_FAILURE', action);
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: false,
        error: action.error,
        team: null
      });

    // =======================================
    // ======= REMOVE DIVISION ATHLETE =======
    // =======================================

    case REMOVE_DIVISION_ATHLETE_REQUEST:
      console.log('\nREMOVE_DIVISION_ATHLETE_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingRemove: true,
        isLoadedRemove: false,
        error: null
      });
    case REMOVE_DIVISION_ATHLETE_SUCCESS:
      console.log('\nREMOVE_DIVISION_ATHLETE_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingRemove: false,
        isLoadedRemove: true,
        team: updateAthlete(state, action.result.division_athlete, action.result.division_id)
      });
    case REMOVE_DIVISION_ATHLETE_FAILURE:
      console.log('\nREMOVE_DIVISION_ATHLETE_FAILURE', action);
      return Object.assign({}, state, {
        isFetchingRemove: false,
        isLoadedRemove: false,
        error: action.error
      });


    // =======================================
    // ======= INVITE DIVISION ATHLETE =======
    // =======================================

    case INVITE_DIVISION_ATHLETE_REQUEST:
      console.log('\nINVITE_DIVISION_ATHLETE_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingInvite: true,
        isLoadedInvite: false,
        error: null
      });
    case INVITE_DIVISION_ATHLETE_SUCCESS:
      console.log('\nINVITE_DIVISION_ATHLETE_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingInvite: false,
        isLoadedInvite: true,
        team: updateInviteAthlete(state, action.result.division_athlete, action.result.division_id, action.result.update)
      });
    case INVITE_DIVISION_ATHLETE_FAILURE:
      console.log('\nINVITE_DIVISION_ATHLETE_FAILURE', action);
      return Object.assign({}, state, {
        isFetchingInvite: false,
        isLoadedInvite: false,
        error: action.error
      });


    // ===========================================
    // ======= INVITE NEW DIVISION ATHLETE =======
    // ===========================================

    case INVITE_NEW_DIVISION_ATHLETE_REQUEST:
      console.log('\nINVITE_NEW_DIVISION_ATHLETE_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingNewInvite: true,
        isLoadedNewInvite: false,
        errorNewInvite: null
      });
    case INVITE_NEW_DIVISION_ATHLETE_SUCCESS:
      console.log('\nINVITE_NEW_DIVISION_ATHLETE_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingNewInvite: false,
        isLoadedNewInvite: true,
      });
    case INVITE_NEW_DIVISION_ATHLETE_FAILURE:
      console.log('\nINVITE_NEW_DIVISION_ATHLETE_FAILURE', action);
      return Object.assign({}, state, {
        isFetchingNewInvite: false,
        isLoadedNewInvite: false,
        errorNewInvite: action.error
      });

    case INVITE_NEW_DIVISION_ATHLETE_RESET:
      console.log('\nINVITE_NEW_DIVISION_ATHLETE_RESET', action);
      return Object.assign({}, state, {
        isFetchingNewInvite: false,
        isLoadedNewInvite: false,
        errorNewInvite: null
      });

    // ===============================
    // ======= CREATE NEW TEAM =======
    // ===============================

    case CREATE_NEW_TEAM_REQUEST:
      console.log('\nCREATE_NEW_TEAM_REQUEST', action);
      return Object.assign({}, state, {
        isFetchingNewTeam: true,
        isLoadedNewTeam: false,
        errorCreateNewTeam: null
      });
    case CREATE_NEW_TEAM_SUCCESS:
      console.log('\nCREATE_NEW_TEAM_SUCCESS', action);
      return Object.assign({}, state, {
        isFetchingNewTeam: false,
        isLoadedNewTeam: true,
      });
    case CREATE_NEW_TEAM_FAILURE:
      console.log('\nCREATE_NEW_TEAM_FAILURE', action);
      return Object.assign({}, state, {
        isFetchingNewTeam: false,
        isLoadedNewTeam: false,
        errorCreateNewTeam: action.error
      });

    default:
      return state;
  }
}

// ================================
// ======= HELPER FUNCTIONS =======
// ================================

export function updateAthlete(currentState, divisionAthlete, divisionId) {
  // as long as a team doesnt exist in the same division twice
  currentState.team.team_status.map( (division) => {
    if (division.division.id == divisionId){
      division.division_athletes.map( (athlete) => {
        if (athlete.user_instance == divisionAthlete.user_instance){
          Object.keys(athlete).forEach( (key, value) => athlete[key] = divisionAthlete[key] )
        }
      })
    }
  })

  return currentState.team;
}


export function updateInviteAthlete(currentState, divisionAthlete, divisionId, update) {
  let result;
  if (update){
    result = updateAthlete(currentState, divisionAthlete, divisionId)
  }
  else{
    // as long as a team doesnt exist in the same division twice
    currentState.team.team_status.map( (division) => {
      if (division.division.id == divisionId){
        division.division_athletes.push(divisionAthlete);
      }
    })
    result = currentState.team
  }

  return result;
}
