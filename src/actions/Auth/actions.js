import {
  LOAD_USER, LOGOUT_USER
} from '../../redux/modules/constants';


export function loadUser(user) {
  return { type: LOAD_USER, user };
}

export function logout(user) {
  return { type: LOGOUT_USER };
}
