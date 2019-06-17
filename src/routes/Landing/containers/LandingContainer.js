import { connect } from 'react-redux'
import LandingView from '../components/LandingView'

import {
  Scan,
  verify
} from '../modules/actions'

const mapDispatchToProps = {
  Scan,
  verify
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  landing: state.landing
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingView)
