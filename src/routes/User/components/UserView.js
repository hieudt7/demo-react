import React from 'react'
import { Link, IndexLink } from 'react-router'
import swal from "sweetalert2"
import Modal from 'components/Modal'
import lodash from 'lodash'
import UserList from 'components/user/UserList'
class UserView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isMobile: false,
    }
  }
  handleClosePopup() {
    this.setState({ modal: null })
    $('body').removeClass('modal-open');
  }
  handleOpenPopup(modal) {
    this.setState({ modal: modal })
    $('body').addClass('modal-open');
  }
  componentDidMount() {
    //--get api
    console.log(this.props.currentUser.currentUser)
  
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.home.user != null && !nextProps.home.isUpdateInfo) {
    // }
  }

  render() {
    const { modal } = this.state
    let { user,currentUser } = this.props
    console.log(this.props.currentUser.currentUser)
    return (
      <React.Fragment>
        <div className="main-body">
          <UserList parentProps={this.props}></UserList>
        </div>
      </React.Fragment>
    )
  }
}

export default UserView
