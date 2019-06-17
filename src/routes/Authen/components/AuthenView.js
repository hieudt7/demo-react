import React from 'react'
import { Link, IndexLink } from 'react-router'
import swal from "sweetalert2"
import Modal from 'components/Modal'
import lodash from 'lodash'

class AuthenView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isMobile: false,
      userName: '',
      password: '',
      isError: true,
      isShowPass: false,
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
    $('body').addClass('login-page')
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.home.user != null && !nextProps.home.isUpdateInfo) {
    // }
  }
  onChangeUser(evt) {
    this.setState({
      userName: evt.target.value,
      isError: false,
    });
  }
  onChangePass(evt) {
    this.setState({
      password: evt.target.value,
      isError: false,
    });
  }
  onLogin() {
    if (this.state.userName.trim() === '' || this.state.password.trim() === '') {
      swal({
        title: 'Thông báo',
        html: '<p class="pop-content">Bạn không được bỏ trống thông tin</p>',
        animation: false,
        confirmButtonText: 'Đóng',
        customClass: 'custom-modal animated zoomIn'
      })
      return
    }
    this.props.login(this.state.userName, this.state.password)
  }
  handleKeyDown(evt){
    if(evt.key ==='Enter'){
      this.props.login(this.state.userName, this.state.password)
    }
  }
  render() {
    const { modal, userName, password, isShowPass } = this.state
    let { home } = this.props
    return (
      <React.Fragment>
        <div className="login-body">
          <div className="login-form">
            <div className="logo">
              <img src="images/" alt="" />
              <h4>ATECH<b>PLUS</b></h4>
            </div>
            <div className="wc-text">Welcome Back</div>
            <div className="input-group">
              <label htmlFor="">Tên đăng nhập</label>
              <input type="text" placeholder="Username" value={userName || ''} onChange={e => this.onChangeUser(e)} onKeyDown={e => this.handleKeyDown(e)}/>
            </div>
            <div className="input-group">
              <label htmlFor="">Mật khẩu</label>
              <input type={isShowPass ? "text" : "password"} placeholder="Password" value={password || ''} onChange={e => this.onChangePass(e)}  onKeyDown={e => this.handleKeyDown(e)}/>
              <a className="show-pass" title="Hiển thị mật khẩu" href="javascript:void(0)" onClick={e => this.setState({isShowPass:!isShowPass})}><i class="fas fa-eye-slash"></i></a>
            </div>
            <p className="forgot-pass">
              <a href="javascript:void(0)">Quên mật khẩu</a>
            </p>
            <a href="javascript:void(0)" className="login-btn" onClick={e => this.onLogin()}>Đăng nhập</a>

          </div>
          <div className="info-form">
            <div className="txt-info">
              <h4>AtechPlus</h4>
              <p>We are protect your product, your life and your future. Keep you bussiness going while the market down.</p>
            </div>
            <div className="img-bg">
              <img src="images/login-bg.png" alt="" />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AuthenView
