import { connect } from 'react-redux'
import HomeView from '../components/HomeView'
import {
  GetListCustomer,
} from '../../User/modules/actions'
import {
  CreateStamp,
  EditStamp,
  GetListStamp,
  PrintStamp,
  DeleteStamp,
  ApproveStamp
} from '../modules/actions'

const mapDispatchToProps = {
  CreateStamp,
  EditStamp,
  GetListStamp,
  GetListCustomer,
  PrintStamp,
  DeleteStamp,
  ApproveStamp
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  home: state.home,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
