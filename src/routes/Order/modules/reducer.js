import {
  IS_GET_STAMP,
  GET_STAMP_SUCCESS,
} from '../../Home/modules/actions'
import {
  IS_LOADING,
  GET_REPORT_SUCCESS
} from './actions'
const initialState = {
  loading: false,
  listStamp: null,
  report:null,
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true
      }
      break;
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
      case GET_REPORT_SUCCESS:
        return {
          ...state,
          report: action.payload,
          loading: false
        }
        break;
    default:
      return state
  }
}
