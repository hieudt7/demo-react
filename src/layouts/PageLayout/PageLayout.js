import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Footer from './Footer'
import Header from './Header'
import swal from "sweetalert2"
import cookie from 'js-cookie';
import { getCurrentUser } from 'authentication/actions'
class PageLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      currentUserState: null,
    }
  }
  componentDidMount() {
    console.log(this.props.location.pathname.split('/s/'))
    if (this.props.location.pathname != '/dang-nhap' && this.props.location.pathname.split('/s').length==1) {
      this.props.getCurrentUser()
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  render() {
    const { modal, currentUserState } = this.state
    return (
      <div id={`wrapper`}>
        <Header
          currentUser={this.props.currentUser}
        />
        <main>
          {this.props.children}
        </main>
        <Footer></Footer>
      </div>
    )
  }
}
PageLayout.propTypes = {
  children: PropTypes.node,
}

const mapDispatchToProps = {
  getCurrentUser: getCurrentUser,
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  location: state.location,
  home: state.home
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
