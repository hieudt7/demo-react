import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Modal from '../Modal'
import swal from "sweetalert2"
import moment from 'moment'
let el1, machine1;
let $target = this;
class EventSection2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            reward_list_spin: null,
            spinIdex: 0,
            shoot: 0,
            stars: 0,
            total_stars: 0,
            rank_match: 0,
            special_match: 0,
            share_facebook: 0,
            any_match: 0,
            shootClass: '',
            shootActive: 0,
            isShoot: false,
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
        if ($(window).width() < 1023) {
            this.setState({
                isMobile: true,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.eventProps.home.user != null) {
            this.setState({
                shoot: nextProps.eventProps.home.user.shoot,
                stars: nextProps.eventProps.home.user.stars,
                total_stars: nextProps.eventProps.home.user.total_stars,
                rank_match: nextProps.eventProps.home.user.state.rank_match,
                special_match: nextProps.eventProps.home.user.state.special_match,
                share_facebook: nextProps.eventProps.home.user.state.share_facebook,
                any_match: nextProps.eventProps.home.user.state.any_match,
            })
        }
    }
    handleShoot(index) {
        if (!this.props.eventProps.home.login) {
            window.location.href = "/user/login"
            return
        }
        else if (this.props.eventProps.home.user.account_id == null) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn vui lòng tạo tài khoản FO4 để tham gia sự kiện.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            $('.wheel').removeClass('disable-click')
            return
        }
        if (this.state.shoot <= 0) {
            swal({
                title: 'Thông báo',
                html: '<img src="images/pop-bg-top.png" class="top-bg"><img src="images/pop-bg-bot.png" class="bot-bg"><p class="pop-content">Bạn đã hết lượt nã pháo</p>',
                animation: false,
                showCloseButton: true,
                confirmButtonText: 'Đóng',
                customClass: 'custom-modal animated zoomIn'
            })
            return
        }
        this.setState({
            shootClass: 'active-animation animation-' + index,
            shootActive: index,
        })
        setTimeout(() => {
            this.props.eventProps.PlayGame()
            this.handleShootActive(index)
            this.setState({
                shootClass: '',
                shootActive: 0
            })
        }, 4000);

    }
    handleShootActive(index) {
        let classActive = 'active-animation animation-' + index
        this.setState({
            shootClass: classActive
        })
    }
    handleViewProgress() {
        if (!this.props.eventProps.home.login) {
            window.location.href = "/user/login"
            return
        }
        else if (this.props.eventProps.home.user.account_id == null) {
            swal({
                title: 'Thông báo',
                html: '<p class="pop-content">Bạn vui lòng tạo tài khoản FO4 để tham gia sự kiện.</p>',
                confirmButtonText: 'Đóng',
                animation: false,
                customClass: 'custom-modal animated zoomIn'
            })
            $('.wheel').removeClass('disable-click')
            return
        }
        this.props.eventProps.UpdateWin()
        this.handleOpenPopup('progress')
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
    render() {
        const { modal, isMobile, reward_list_spin, shoot, stars, total_stars, rank_match, special_match, share_facebook, any_match, shootClass, shootActive } = this.state
        return (
            <React.Fragment>
                <section className="sec-3" id="section3">
                    {/* <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-bg.png" alt="" /> */}
                    {(!isMobile) &&
                        <div className="bg bg-sec-2">
                            <div className="bg-main no-eff"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s1-bg.png" alt="" /></div>
                            <div className="left-clound"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s1-l-clound.png" alt="" /></div>
                            <div className="right-clound-2"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s1-r-clound.png" alt="" /></div>
                            <div className="ground no-eff"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s1-ground.png" alt="" /></div>
                            <div className="ball-2"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s1-ball.png" alt="" /></div>
                        </div>
                    }
                    {
                        (isMobile) &&
                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-bg-mb.png" alt="" />
                    }
                    <div className="content-abs">
                        <div className="title" data-aos="zoom-in" data-aos-delay="500">
                            {(!isMobile) &&
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-title.png" alt="" />
                            }
                            {(isMobile) &&
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-title-mb.png" alt="" />
                            }
                        </div>
                        <div className="wrap-top" data-aos="fade-left" data-aos-delay="600">
                            <div className="top-info">
                                <ul>
                                    <li>
                                        <span>Số lượt nã pháo còn lại: {shoot}</span>
                                    </li>
                                    <li className="margin"><span>|</span></li>
                                    <li>
                                        <span>số sao đã góp: {total_stars}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="goal-board" data-aos="zoom-in" data-aos-delay="300">
                            <div className="wrap-board animated">
                                <span className="note-txt"><img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/shoot-note.png" alt="" /></span>
                                <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-goal.png" alt="" />
                                <ul className="goal" className={`goal ${shootActive !== 0 ? 'disable-click' : ''}`}>
                                    <li>
                                        <a href="javascript:void(0)" onClick={e => this.handleShoot(1)} className={`${shootActive == 1 ? 'active-card' : ''}`}>
                                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-g-1.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={e => this.handleShoot(2)} className={`${shootActive == 2 ? 'active-card' : ''}`}>
                                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-g-2.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={e => this.handleShoot(3)} className={`${shootActive == 3 ? 'active-card' : ''}`}>
                                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-g-3.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={e => this.handleShoot(4)} className={`${shootActive == 4 ? 'active-card' : ''}`}>
                                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-g-4.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={e => this.handleShoot(5)} className={`${shootActive == 5 ? 'active-card' : ''}`}>
                                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-g-5.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" onClick={e => this.handleShoot(6)} className={`${shootActive == 6 ? 'active-card' : ''}`}>
                                            <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s2-g-6.png" alt="" />
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div className="group-btn" data-aos="fade-up">
                                <a href="javascript:void(0)" className="btn-img btn-startt" onClick={e => this.props.eventProps.shareFB('https://30thang4.fo4.garena.vn')}>
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/buttonshare.png" alt="" />
                                </a>
                                <a href="javascript:void(0)" className="btn-img btn-progress" onClick={e => this.handleViewProgress()}>
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/btn_progress.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="ball-panel">
                            <div className={`ball-body ${shootClass}`} id="test-ball">
                                <div className="wrap-ball-eff">
                                    <div className="ball-animation">
                                        <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/s1-ball.png" alt="" className="ball" />
                                        {/* <img src="images/flyingball.png" alt=""/> */}
                                    </div>
                                </div>
                                <img src="images/target_effect.png" alt="" className="ball-eff" />
                            </div>
                        </div>
                    </div>
                </section>
                <Modal show={modal === 'progress'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <div className="pop-progress">
                        <h3 className="md-header">tiến độ hôm nay</h3>
                        <ul className="list-miss">
                            <li>
                                <span className="sp-number">1.</span>
                                <span className="sp-txt">
                                    Thắng trận đấu giải hoặc xếp hạng (có tính giả lập) <br />
                                    <i>Nhận lượt nã pháo</i>
                                </span>
                                <span className="sp-check">
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/buble.png" alt="" />
                                    <span className="wrap-t">
                                        <span className="ftxt">{rank_match}</span>
                                        <span>/</span>
                                        <span className="ltxt">3</span>
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className="sp-number">2.</span>
                                <span className="sp-txt">
                                    Thắng mode giải trí (chế độ random) <br />
                                    <i>Nhận lượt nã pháo</i>
                                </span>
                                <span className="sp-check">
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/buble.png" alt="" />
                                    <span className="wrap-t">
                                        <span className="ftxt">{special_match}</span>
                                        <span>/</span>
                                        <span className="ltxt">2</span>
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className="sp-number">3.</span>
                                <span className="sp-txt">
                                    Share trang sự kiện <br />
                                    <i>Nhận lượt nã pháo</i>
                                </span>
                                <span className="sp-check">
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/buble.png" alt="" />
                                    <span className="wrap-t">
                                        <span className="ftxt">{share_facebook}</span>
                                        <span>/</span>
                                        <span className="ltxt">1</span>
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className="sp-number">4.</span>
                                <span className="sp-txt">
                                    Thắng thêm trận mode giải trí để góp thêm sao <br />
                                    <i>Không nhận lượt nã pháo - chỉ tích sao để nhận quà góp sao</i>
                                </span>
                                <span className="sp-check">
                                    <img src="https://cdn.vn.garenanow.com/web/fo3/fo4/fo4-30-april-2019/images/buble.png" alt="" />
                                    <span className="wrap-t">
                                        <span className="">{any_match}</span>
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}
export default EventSection2
