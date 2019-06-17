import {
  IS_CREATE_USER,
  CREATE_USER_SUCCESS,
  IS_GET_USER,
  GET_USER_SUCCESS,
  IS_GET_CUSTOMER,
  GET_CUSTOMER_SUCCESS
} from './actions'

const initialState = {
  loading: false,
  listUser: null,
  listCustomer: null,
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case IS_CREATE_USER:
      return {
        ...state,
        loading: true
      }
      break;
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false
      }
      break;
      case IS_GET_USER:
        return {
          ...state,
          loading: true
        }
        break;
      case GET_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          listUser:action.payload
        }
        break;
        case IS_GET_CUSTOMER:
          return {
            ...state,
            loading: true
          }
          break;
        case GET_CUSTOMER_SUCCESS:
          return {
            ...state,
            loading: false,
            listCustomer:action.payload
          }
          break;
    default:
      return state
  }
}
