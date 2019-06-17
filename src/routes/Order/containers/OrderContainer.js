import { connect } from 'react-redux'
import OrderView from '../components/OrderView'

import {
} from '../modules/actions'
import {
  GetListStamp,
  
} from '../../Home/modules/actions'
import {
  getReport
} from '../modules/actions'
const mapDispatchToProps = {
  GetListStamp,
  getReport
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  order: state.order,
  home: state.home,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderView)
