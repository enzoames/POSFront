import { LOAD_USER, LOGOUT_USER,
  SAVE_RECEIPT_REQUEST, SAVE_RECEIPT_SUCCESS, SAVE_RECEIPT_FAILURE
} from './constants';

const initialState = {
  user: null,
  loaded: false,
  isPostingReceipt: false, 
  isReceiptLoaded: false,
  error: null
};

export default function salon(state = initialState, action = {}) {
  switch (action.type) {
    
    // ==================================
    // ============== USER ==============
    // ==================================

    case LOAD_USER:
      console.log('\nLOAD_USER', action);
      return Object.assign({}, state, {
        user: action.user,
        loaded: true
      });
    case LOGOUT_USER:
      console.log('\nLOGOUT_USER', action);
      return Object.assign({}, state, {
        user: null,
        loaded: false
      });  

    // =====================================
    // ============== RECEIPT ==============
    // =====================================

    case SAVE_RECEIPT_REQUEST:
      console.log('\nSAVE_RECEIPT_REQUEST', action);
      return Object.assign({}, state, {
        isPostingReceipt: true,
        isReceiptLoaded: false
      });
    case SAVE_RECEIPT_SUCCESS:
      console.log('\nSAVE_RECEIPT_SUCCESS', action);
      return Object.assign({}, state, {
        isPostingReceipt: false,
        isReceiptLoaded: true
      });
    case SAVE_RECEIPT_FAILURE:
      console.log('\nSAVE_RECEIPT_FAILURE', action);
      return Object.assign({}, state, {
        isPostingReceipt: false,
        isReceiptLoaded: false,
        error: action.error
      });

    default:
      return state;
  }
}
