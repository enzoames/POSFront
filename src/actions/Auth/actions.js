import {
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
  VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE,
  ON_BOARDING_REQUEST, ON_BOARDING_SUCCESS, ON_BOARDING_FAILURE,
  SET_REDIRECT_URL, CHECK_TOKEN,
  USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  DEACTIVATE_ACCOUNT_REQUEST, DEACTIVATE_ACCOUNT_SUCCESS, DEACTIVATE_ACCOUNT_FAILURE,
  EDIT_PROFILE_URL_REQUEST, EDIT_PROFILE_URL_SUCCESS, EDIT_PROFILE_URL_FAILURE,
} from '../../redux/modules/constants';

// =============================================
// ============== REGISTER ACTION ==============
// =============================================

export function register(body) {
  return {
    types: [REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE],
    promise: client => client.post('api/rest-auth/registration/', {
        data: body,
    })
  };
}


// =======================================================
// ============== EMAIL VERIFICATION ACTION ==============
// =======================================================

export function verifyEmail(token){
  return {
    types: [VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE],
    //types: [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE], //sends a load user when email needs to be verified
    promise: client => client.post(`api/sporta/accounts/verify-email/?token=${token}`, {
    })
  };
}


// =========================================
// ============== ON BOARDING ==============
// =========================================

export function onBoarding(body){
  return {
    types: [ON_BOARDING_REQUEST, ON_BOARDING_SUCCESS, ON_BOARDING_FAILURE],
    promise: client => client.put("api/sporta/accounts/sportaregistration/", {
      data: body,
      authenticated: true
    })
  };
}

export function sportaOnBoarding(body){
  return function(dispatch) {
    dispatch(onBoarding(body)).then( () => dispatch(load()));
  }
}


// =========================================
// ============== LOAD ACTION ==============
// =========================================

export function load() {
  return {
    types: [LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE],
    promise: (client) => client.get('api/rest-auth/user/',{
      authenticated: true,
    })
  };
}


// ==========================================
// ============== LOGIN ACTION ==============
// ==========================================

export function login(body) {
  return {
    types: [LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE],
    promise: (client) => client.post('api/rest-auth/login/', {
      data: body,
    })
  };
}


export function loginSaveUser(body, flag){
  return function(dispatch) {
    switch(flag) {
      case 'login':
        dispatch(login(body))
          .then((res) => {
            // console.log("\nACTIONS RES LOGINSAVEUSER", res);
            typeof localStorage !== 'undefined' ? localStorage.setItem('id_token', res.token) : '';
            // console.log("\n ACTIONS LOCALSTORAGE", localStorage);
        });
        break;
      default:
        break;
    };
  }
}


// ===========================================
// ============== LOGOUT ACTION ==============
// ===========================================

export function logout() {
  return {
    types: [LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE],
    promise: client => client.post('api/rest-auth/logout/')
  };
}

export function logoutRemoveUser(){
  return function(dispatch) {
    const flag = 'logout';
    switch(flag) {
      case 'logout':
        dispatch(logout())
          .then((res) => {
            typeof localStorage !== 'undefined' && localStorage.setItem('id_token', null);
          });
        break;
      default:
        break;
    };
  }
}


// =================================================
// ============== REDIRECT URL ACTION ==============
// =================================================


export function setRedirectUrl(url) {
  return {
    type: SET_REDIRECT_URL,
    payload: url
  };
}

export function checkToken() {
  return {
    type: CHECK_TOKEN,
  };
}


// =================================================
// =========== EDIT PROFILE URL ACTION =============
// =================================================

export function editProfileUrl(body) {
  return {
    types: [EDIT_PROFILE_URL_REQUEST, EDIT_PROFILE_URL_SUCCESS, EDIT_PROFILE_URL_FAILURE],
    promise: client => client.put('api/sporta/accounts/change_url/', {
      data: body,
      authenticated: true
    })
  };
}


// =================================================
// ======= UPDATE BASIC INFORMATION ACTION =========
// =================================================

export function updateBasicInformation(body) {
  return {
    types: [USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE],
    promise: client => client.put('api/sporta/accounts/user/', {
      data: body,
      authenticated: true
    })
  };
}


// =================================================
// ============= RESET PASSWORD ACTION =============
// =================================================

export function resetPassword(body) {
  return {
    types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
    promise: client => client.post('api/rest-auth/password/change/', {
      data: body,
      authenticated: true
    })
  };
}


// =================================================
// ============== DEACTIVATE ACCOUNT ===============
// =================================================

export function deactivateAccount(id) {
  return {
    types: [DEACTIVATE_ACCOUNT_REQUEST, DEACTIVATE_ACCOUNT_SUCCESS, DEACTIVATE_ACCOUNT_FAILURE],
    promise: client => client.del(`api/sporta/accounts/user/${id}/`, {
      authenticated: true
    })
  };
}

export function deactivateSportaAccount(id) {
  return function(dispatch) {
    dispatch(deactivateAccount(id)).then( () => dispatch(logout()));
  }
}
