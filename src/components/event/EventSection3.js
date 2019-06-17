import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Modal from '../Modal'
import swal from "sweetalert2"
import moment from 'moment'
import lodash from 'lodash'
import Clipboard from 'react-clipboard.js';
import Scrollbar from 'react-scrollbars-custom';
class EventSection3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isMobile: false,
      accumulate_stars: 0,
      contributions: null,
      redeem: null,
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
    let $this = this
    setTimeout(() => {
      $this.props.eventProps.GetTopUser()
      setInterval(() => {
        $this.props.eventProps.GetTopUser()
      }, 30000);
    }, 1000);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.eventProps.home.contributions != null) {
      this.setState({
        contributions: nextProps.eventProps.home.contributions,
        accumulate_stars: nextProps.eventProps.home.accumulate_stars,
      })
    }
    if (nextProps.eventProps.home.user != null && !nextProps.eventProps.home.isGetTop) {
      this.setState({
        redeem: nextProps.eventProps.home.user.redeem,
      })
    }
  }
  convertDateForIos(date) {
    var arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    return date;
  }
  countdownItem() {
    let runDate = '2019-05-01 23:59:59'
    // let runDate = moment(time).add(4, 'hours').format('YYYY-MM-DD HH:mm:ss')
    let countdownDate = this.convertDateForIos(runDate)
    setTimeout(() => {
      $('.countdown').countdown({
        date: countdownDate,
        render: function (data) {
          $(this.el).html('<span class="timer">' + this.leadingZeros(data.days, 2) + '</span><span class="title">ngày</span><span class="timer">' + this.leadingZeros(data.hours, 2) + '</span><span class="title">giờ</span><span class="timer">' + this.leadingZeros(data.min, 2) + '</span><span class="title">phút</span>');
        }
      });
    }, 1000);
  }
  smoothScroll(target) {
    $('html,body').stop().animate({
      scrollTop: $(target).offset().top - 100
    }, 1000);
  }
  commingSoon() {
    swal({
      title: 'thông báo',
      html: '<img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/pop-bg-top.png" class="top-bg"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/pop-bg-bot.png" class="bot-bg"><p class="pop-content">Sự kiện sẽ bắt đầu vào 11h00 ngày 26/04/2019</p>',
      animation: false,
      showCloseButton: true,
      confirmButtonText: 'Đóng',
      customClass: 'custom-modal animated zoomIn'
    })
  }
  handleRedeem(stars) {
    this.props.eventProps.RedeemGift(stars)
  }
  checkRedeemGift(target) {
    let result = ''
    if (!this.state.redeem) {
      return 'active'
    }
    if (this.state.redeem[target] != undefined) {
      result = ''
    }
    else if (this.state.accumulate_stars >= target) {
      result = 'active'
    }
    return result
  }
  render() {
    const { modal, isMobile, accumulate_stars, contributions } = this.state
    return (
      <React.Fragment>
        <section className="sec-4" id="section4">
          <div className="fo4-container">
            <div className="group-table">
              <div className="cell c-left">
                <div className="title">
                  <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s4-title.png" alt="" />
                  <div className="target">
                    <span className="total-star">Số sao hiện tại: {accumulate_stars}</span>
                    <div className="target-mock">
                      <img src="images/led.png" alt="" className="img-first" />
                      <div className="wrap-bg-target" style={{ height: (accumulate_stars / 50000) + '%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cell c-right">
                <div className="top-player">
                  <Scrollbar className="content">
                    {(contributions) &&
                      contributions.map((item, idx) => (
                        <p key={idx}>{item.account_name} góp {item.stars} sao mừng Đại Lễ</p>
                      ))}
                  </Scrollbar>
                </div>
                <div className="count-down">
                  <h4>thời gian sự kiện còn lại</h4>
                  <div className="countdown">{this.countdownItem()}</div>
                </div>
              </div>
            </div>
            <div className="star-progress">
              <a href="javascript:void(0)" onClick={e => this.handleRedeem(2000000)} title="nhận thưởng" className={`f-target ${this.checkRedeemGift(2000000)}`}>
                {
                  accumulate_stars >= 2000000 ? (
                    <img src="images/button1.png" alt="" />
                  ) : (
                      <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/target-first.png" alt="" />
                    )
                }
              </a>
              <a href="javascript:void(0)" onClick={e => this.handleRedeem(5000000)} title="nhận thưởng" className={`final-target ${this.checkRedeemGift(5000000)}`}>
                {
                  accumulate_stars >= 5000000 ? (
                    <img src="images/button2.png" alt="" />
                  ) : (
                      <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/target-final.png" alt="" />
                    )
                }
              </a>
              <div className="progress-inner" style={{ width: (accumulate_stars / 50000) + '%' }}></div>
            </div>
            <div className="group-btn" data-aos="fade-up">
              <a href="javascript:void(0)" onClick={e => this.smoothScroll('#section3')} className="btn-img"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/btn-send.png" alt="" /></a>
              <a href="javascript:void(0)" onClick={e => this.handleOpenPopup('gift')} className="btn-img"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/btn-gift.png" alt="" /></a>
            </div>
          </div>
        </section>
        <Modal show={modal === 'gift'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
          <h3 className="md-header">quà có thể nhận</h3>
          <div className="image-pop">
            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/pop_gift.png" alt="" />
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export default EventSection3
