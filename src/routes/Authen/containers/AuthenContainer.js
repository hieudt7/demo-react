import { connect } from 'react-redux'
import AuthenView from '../components/AuthenView'

import {
  login
} from '../../../authentication/actions'

const mapDispatchToProps = {
  login
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  authen: state.authen
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenView)
