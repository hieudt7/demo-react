import {
  IS_SCAN,
  SCAN_SUCCESS
} from './actions'

const initialState = {
  loading: false,
  temDetail: null,
}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case IS_SCAN:
      return {
        ...state,
        loading: true,
      }
      break;
    case SCAN_SUCCESS:
      return {
        ...state,
        loading: false,
        temDetail: action.payload
      }
      break;
    default:
      return state
  }
}
