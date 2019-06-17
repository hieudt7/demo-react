import cookie from 'js-cookie';
import {
  LOGIN_SUCCESS,
  IS_LOGIN
} from './actions'

const initialState = {
  loading: false,
  login: false,
  currentUser: null,
  isShowModal: null,
}

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {

    case IS_LOGIN:
      return {
        ...state,
        loading: true,
      }
      break;
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        login: true,
        currentUser: action.payload,
      }
      break;
    default:
      return state
  }
}
