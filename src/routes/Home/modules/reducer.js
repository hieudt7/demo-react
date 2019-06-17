import {
  IS_GET_STAMP,
  GET_STAMP_SUCCESS,
  IS_PRINT_STAMP,
  PRINT_STAMP_SUCCESS,
  IS_DELETE_STAMP,
  DELETE_STAMP_SUCCESS,
} from './actions'
import {
  IS_GET_CUSTOMER,
  GET_CUSTOMER_SUCCESS
} from '../../User/modules/actions'
const initialState = {
  loading: false,
  listStamp: null,
  customer: null,
  exportFile: null,
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case IS_GET_STAMP:
      return {
        ...state,
        loading: true
      }
      break;
    case GET_STAMP_SUCCESS:
      return {
        ...state,
        listStamp: action.payload,
        loading: false
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
        customer: action.payload,
        loading: false
      }
      break;
    case IS_PRINT_STAMP:
      return {
        ...state,
        loading: true
      }
      break;
    case PRINT_STAMP_SUCCESS:
      return {
        ...state,
        exportFile: action.payload,
        loading: false
      }
      break;
    case IS_DELETE_STAMP:
      return {
        ...state,
        loading: true
      }
      break;
    case DELETE_STAMP_SUCCESS:
      return {
        ...state,
        loading: false
      }
      break;
    default:
      return state
  }
}
