import {
  LOAD_USER, LOGOUT_USER,
  SAVE_RECEIPT_REQUEST, SAVE_RECEIPT_SUCCESS, SAVE_RECEIPT_FAILURE
} from '../../redux/modules/constants';


export function loadUser(user) {
  return { type: LOAD_USER, user };
}

export function logout(user) {
  return { type: LOGOUT_USER };
}

export function saveReceipt(body) {
  return {
    types: [SAVE_RECEIPT_REQUEST, SAVE_RECEIPT_SUCCESS, SAVE_RECEIPT_FAILURE],
    promise: client => client.post('api/salon/receipt/', {
        data: body,
    })
  };
}

