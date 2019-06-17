import React from "react";
import Modal from 'components/Modal'
import moment from 'moment'
import { Link, IndexLink } from 'react-router'
import swal from "sweetalert2"
import cookie from 'js-cookie';
import Pagination from "react-js-pagination";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
    }
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
   
  }
  handleClosePopup() {
    this.setState({ modal: null })
    $('body').removeClass('modal-open');
  }
  handleOpenPopup(modal) {
    this.setState({ modal: modal })
    $('body').addClass('modal-open');
  }
  handleLogOut(){
    cookie.set('userQR', null);
    cookie.set('csrftoken', null);
    window.location.href="/dang-nhap";
  }
  render() {
    let { currentUser } = this.props.currentUser;
    const { modal } = this.state
    return (
      <React.Fragment>
        <header>
          <nav className="fo4-container">
            <div className="collapse" id="navbarSupportedContent">
              <ul className="menu">
                <li className="menu-sub">
                  <ul>
                    <li>
                      <a href="/">menu 1</a>
                    </li>
                    <li>
                      <a href="/nguoi-dung">menu 2</a>
                    </li>
                    <li>
                      <a href="/thong-ke">menu 3</a>
                    </li>
                  </ul>
                </li>

                {!currentUser ? (
                  <React.Fragment>
                    <li>
                      <a href="/dang-nhap"><span>ĐĂNG NHẬP</span></a>
                    </li>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      <li>
                        <a href="javascript:void(0)" onClick={e => this.handleLogOut()} title="Đăng Xuất" className="txt-user" title="Đăng xuất">
                          <span className="username-txt">xin chào, {currentUser.userName}  </span>
                          <span className="logout-text">&nbsp;|&nbsp;Đăng Xuất</span>
                        </a>
                      </li>
                    </React.Fragment>
                  )}

              </ul>
            </div>
          </nav>
        </header>
      </React.Fragment>
    );
  }
}
