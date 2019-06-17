import React from 'react'
import { Link, IndexLink } from 'react-router'
import swal from "sweetalert2"
import Modal from 'components/Modal'
import lodash from 'lodash'
import moment from 'moment'
class LandingView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isMobile: false,
      userName: '',
      password: '',
      isError: true,
      tab: 'product',
      temDetail: null,
    }
  }
  //product
  //company
  //contact
  //feedback
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
    console.log(this.props.location.pathname)
    $('body').addClass('login-page')
    //000002000000
    let id = window.location.href.split('/')[4]
    this.props.Scan(id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.landing.temDetail != null && !nextProps.landing.loading) {
      this.setState({
        temDetail: nextProps.landing.temDetail
      })
    }
  }
  swapTab(tab) {
    this.setState({
      tab: tab
    })
  }
  verify(maXacThuc) {
    let id = window.location.href.split('/')[4]
    this.props.verify(id, maXacThuc)
  }
  checkActiveMenu(tab) {
    if (this.state.tab == tab) {
      return 'active'
    }
  }
  render() {
    const { modal, tab, temDetail } = this.state
    let { lading } = this.props
    return (
      <React.Fragment>
        <div className="landing-page">
          {
            temDetail &&
            <React.Fragment>
              {
                temDetail.loTem.isActive ? (
                  <React.Fragment>
                    {
                      tab == 'product' &&
                      <div className="tab-product animated fadeInDown">
                        <div className="banner-product">
                          <img src="/images/bg-mb-2.jpeg" alt="" />
                        </div>
                        <div className="pd-image">
                          <h3>{temDetail.loTem.tenSanPham}</h3>
                          <div className="wrap-img">
                            <img src={temDetail.loTem.hinhAnh} alt="" />
                          </div>
                        </div>
                        <p className="land-padd">Sản phẩm được kiểm duyệt và xác thực bởi <a href="javascript:void(0)" onClick={() => this.swapTab('contact')}>Actechplus</a></p>
                        <div className="verify-info">
                          <h3>Thông tin xác thực</h3>
                          <ul>
                            <li>
                              <span>Lượt quét</span>
                              <span>{temDetail.scan.length}</span>
                            </li>
                            <li>
                              <span>Lần xác thực</span>
                              <span>{temDetail.xacThuc.length}</span>
                            </li>
                            {
                              temDetail.xacThuc.length > 0 &&
                              <React.Fragment>
                                <li className="line-text">Thông tin lân đầu xác thực</li>
                                <li>
                                  <span>Thời gian</span>
                                  <span>{moment(temDetail.xacThuc[0].timeScan).utcOffset('+0700').format('DD-MM-YYYY HH:mm')}</span>
                                </li>
                                {
                                  temDetail.xacThuc[0].address &&
                                  <li>
                                    <span>Địa điểm</span>
                                    <span>{JSON.parse(temDetail.xacThuc[0].address).city}, {JSON.parse(temDetail.xacThuc[0].address).country}</span>
                                  </li>
                                }
                              </React.Fragment>
                            }
                          </ul>
                        </div>
                        <div className="veryfi-block">
                          <input type="text" className="" disabled value={temDetail.maXacThuc} />
                          <a href="javascript:void(0)" className="btn-main" onClick={() => this.verify(temDetail.maXacThuc)}>xác thực</a>
                        </div>
                        <div className="product-info">
                          <h3>Thông tin sản phẩm</h3>
                          <div dangerouslySetInnerHTML={{ __html: temDetail.loTem.thongTinSanPham }} />
                        </div>
                        <div className="product-related">
                          <h3>Sản phẩm liên quan</h3>
                          <ul>
                            <li>
                              <a href="#">
                                <img src="images/" alt="" />
                                <p className="name">sản phẩm 1</p>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    }
                    {
                      tab == 'company' &&
                      <div className="tab-company animated fadeInUp">
                        <div className="banner-product">
                          <img src="/images/bg-mb-2.jpeg" alt="" />
                        </div>
                        <div className="company-info">
                          <div className="wrap-info">
                            <div className="box-avatar">
                              <img src={temDetail.loTem.customerAddress} alt="" />
                            </div>
                            <h4 className="company-name">{temDetail.loTem.customerName}</h4>
                            <p className="address">{temDetail.loTem.customerAddress}</p>
                            <ul className="contact">
                              <li>
                                <p>Hotline</p>
                                <a href={'tel:' + temDetail.customerPhone}>{temDetail.loTem.customerPhone}</a>
                              </li>
                              <li>
                                <p>Email</p>
                                <a href={'mailto:' + temDetail.customerEmail}>{temDetail.loTem.customerEmail}</a>
                              </li>
                            </ul>
                          </div>
                          <div className="more-info">
                            <h4 className="title">Thông tin chi tiết</h4>
                            <div dangerouslySetInnerHTML={{ __html: temDetail.loTem.customerThongTin }} />
                          </div>
                        </div>
                      </div>
                    }
                    {
                      tab == 'contact' &&
                      <div className="tab-company animated zoomIn">
                        <div className="banner-product">
                          <img src="/images/bg-mb-2.jpeg" alt="" />
                        </div>
                        <div className="company-info">
                          <div className="wrap-info">
                            <div className="box-avatar">
                              <img src="/images/logo.png" alt="" />
                            </div>
                            <h4 className="company-name">Actechplus</h4>
                            <p className="address">Số 14, đường Hoàng Hoa Thám, Quận Tây Hồ, Hà Nội</p>
                            <ul className="contact">
                              <li>
                                <p>Hotline</p>
                                <a href="tel:0123456789">0123456789</a>
                              </li>
                              <li>
                                <p>Email</p>
                                <a href="mailto:someone@example.com">someone@example.com</a>
                              </li>
                            </ul>
                          </div>
                          <div className="more-info">
                            <h4 className="title">Thông tin chi tiết</h4>
                          </div>
                        </div>
                      </div>
                    }
                    {
                      tab == 'feedback' &&
                      <div className="tab-feedback animated fadeInLeft">
                        <h4 className="f-title">Phản hồi sản phẩm</h4>
                        <div className="f-group">
                          <label htmlFor="">Họ và Tên</label>
                          <input type="text" />
                        </div>
                        <div className="f-group">
                          <label htmlFor="">SĐT</label>
                          <input type="text" />
                        </div>
                        <div className="f-group">
                          <label htmlFor="">Email</label>
                          <input type="text" />
                        </div>
                        <div className="f-group">
                          <label htmlFor="">Phản hồi</label>
                          <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className="f-group">
                          <a href="javascript:voi(0)" className="btn-main">Gửi phản hồi</a>
                        </div>
                      </div>
                    }
                  </React.Fragment>
                ) : (
                    <div className="not-found-tem"></div>
                  )
              }
              <input type="checkbox" className="nav--checkbox" id="nav-toggle" />
              <label for="nav-toggle" className="nav--button">
                <span>&nbsp;</span>
              </label>
              <div className={`nav--small nav--btn-1 ${this.checkActiveMenu('Name')}`}>
                <a href={'tel:' + temDetail.customerPhone} title="Liên hệ"><img src="/images/i_contact.png" alt="" /></a>
              </div>

              <div className={`nav--small nav--btn-2 ${this.checkActiveMenu('company')}`}>
                <a href="javascript:void(0)" title="thông tin công ty" onClick={() => this.swapTab('company')}><img src="/images/i_location.png" alt="" /></a>
              </div>
              <div className={`nav--small nav--btn-3 ${this.checkActiveMenu('product')}`}>
                <a href="javascript:void(0)" title="Thông tin sản phẩm" onClick={() => this.swapTab('product')}><img src="/images/i_verify.png" alt="" /></a>
              </div>
              <div className={`nav--small nav--btn-4 ${this.checkActiveMenu('feedback')}`}>
                <a href="javascript:void(0)" title="Phản hồi" onClick={() => this.swapTab('feedback')}><img src="/images/i_feedback.png" alt="" /></a>
              </div>
            </React.Fragment>
          }

        </div>
      </React.Fragment>
    )
  }
}

export default LandingView
