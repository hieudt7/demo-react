import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Header from 'layouts/PageLayout/Header'
import { Link, IndexLink } from 'react-router'
import swal from "sweetalert2"
import Modal from 'components/Modal'
import StampList from 'components/stamp/StampList'
import StampCreate from 'components/stamp/StampCreate'
import lodash from 'lodash'

let timmer, gridForLoop;
class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isMobile: false,
      itemSelected:null,
      tab:'list'
    }
    this.handler = this.handler.bind(this)
  }
  handler(someValue,item) {
    this.setState({
      tab: someValue,
      itemSelected:item
    })
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
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.home.user != null && !nextProps.home.isUpdateInfo) {
    // }
  }

  render() {
    const { modal,tab,itemSelected } = this.state
    let { home } = this.props
    console.log(this.props)
    return (
      <React.Fragment>
        <div className="main-body">
        {
          tab === 'list' &&
          <StampList handler = {this.handler} homeProp={this.props}></StampList>
        }
        {
          (tab === 'create' || tab === 'duplicate' ||  tab === 'edit') &&
          <StampCreate handler = {this.handler} itemSelected={itemSelected} stampState={tab} homeProp={this.props}></StampCreate>
        }
        </div>
      </React.Fragment>
    )
  }
}

export default HomeView
