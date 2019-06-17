import { connect } from 'react-redux'
import UserView from '../components/UserView'

import {
  CreateUser,
  GetListUser,
  GetListCustomer,
  EditUser
} from '../modules/actions'

const mapDispatchToProps = {
  CreateUser,
  GetListUser,
  GetListCustomer,
  EditUser
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(UserView)
