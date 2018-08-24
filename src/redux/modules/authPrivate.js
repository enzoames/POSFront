import {
  EDIT_PROFILE_URL_REQUEST, EDIT_PROFILE_URL_SUCCESS, EDIT_PROFILE_URL_FAILURE,
  USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  DEACTIVATE_ACCOUNT_REQUEST, DEACTIVATE_ACCOUNT_SUCCESS, DEACTIVATE_ACCOUNT_FAILURE,
} from './constants'

const initialState = {
  // edit profile url
  isPostingProfile: false,
  isLoadedProfile: false,
  profileResult: null,
  profileError: null,
  // update user info
  isPostingUser: false,
  isLoadedUser: false,
  userResult: null,
  userError: null,
  // reset password
  isPostingPassword: false,
  isLoadedPassword: false,
  passwordResult: null,
  passwordError: null,
  // deactivate account
  isPostingDeactivate: false,
  isLoadedDeactivate: false,
  deactivateResult: null,
  deactivateError: null,
};

export default function authPrivate(state = initialState, action = {}) {
  switch (action.type) {
    // edit profile url
    case EDIT_PROFILE_URL_REQUEST:
      console.log('\nEDIT_PROFILE_URL_REQUEST', action)
      return Object.assign({}, state, {
        isPostingProfile: true,
        isLoadedProfile: false,
        profileError: null,
        profileResult: null,
      });
    case EDIT_PROFILE_URL_SUCCESS:
      console.log('\nEDIT_PROFILE_URL_SUCCESS', action)
      return Object.assign({}, state, {
        isPostingProfile: false,
        isLoadedProfile: true,
        profileError: null,
        profileResult: action.result,
      });
    case EDIT_PROFILE_URL_FAILURE:
      console.log('\nEDIT_PROFILE_URL_FAILURE', action);
      return Object.assign({}, state, {
        isPostingProfile: false,
        isLoadedProfile: false,
        profileError: action.error,
        profileResult: null,
      });
    // update user info
    case USER_INFO_REQUEST:
      console.log('\nUSER_INFO_REQUEST', action)
      return Object.assign({}, state, {
        isPostingUser: true,
        isLoadedUser: false,
        userError: null,
        userResult: null,
      });
    case USER_INFO_SUCCESS:
      console.log('\nUSER_INFO_SUCCESS', action)
      return Object.assign({}, state, {
        isPostingUser: false,
        isLoadedUser: true,
        userError: null,
        userResult: action.result,
      });
    case USER_INFO_FAILURE:
      console.log('\nUSER_INFO_FAILURE', action);
      return Object.assign({}, state, {
        isPostingUser: false,
        isLoadedUser: false,
        userError: action.error,
        userResult: null,
      });
    // reset password
    case RESET_PASSWORD_REQUEST:
      console.log('\nRESET_PASSWORD_REQUEST', action)
      return Object.assign({}, state, {
        isPostingPassword: true,
        isLoadedPassword: false,
        passwordError: null,
        passwordResult: null,
      });
    case RESET_PASSWORD_SUCCESS:
      console.log('\nRESET_PASSWORD_SUCCESS', action)
      return Object.assign({}, state, {
        isPostingPassword: false,
        isLoadedPassword: true,
        passwordError: null,
        passwordResult: action.result,
      });
    case RESET_PASSWORD_FAILURE:
      console.log('\nRESET_PASSWORD_FAILURE', action);
      return Object.assign({}, state, {
        isPostingPassword: false,
        isLoadedPassword: false,
        passwordError: action.error,
        passwordResult: null,
      });
    // deactivate account
    case DEACTIVATE_ACCOUNT_REQUEST:
      console.log('\nDEACTIVATE_ACCOUNT_REQUEST', action)
      return Object.assign({}, state, {
        isPostingDeactivate: true,
        isLoadedDeactivate: false,
        deactivateError: null,
        deactivateResult: null,
      });
    case DEACTIVATE_ACCOUNT_SUCCESS:
      console.log('\nDEACTIVATE_ACCOUNT_SUCCESS', action)
      return Object.assign({}, state, {
        isPostingDeactivate: false,
        isLoadedDeactivate: true,
        deactivateError: null,
        deactivateResult: action.result,
      });
    case DEACTIVATE_ACCOUNT_FAILURE:
      console.log('\nDEACTIVATE_ACCOUNT_FAILURE', action);
      return Object.assign({}, state, {
        isPostingDeactivate: false,
        isLoadedDeactivate: false,
        deactivateError: action.error,
        deactivateResult: null,
      });
    default:
      return state;
  }
}
