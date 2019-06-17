import React from 'react'
import Modal from 'components/Modal'
import swal from "sweetalert2"
import moment from 'moment'
import { role, accountType } from 'components/common'
import Scrollbar from 'react-scrollbars-custom';
import UserCreate from './UserCreate'
import DatePicker from "react-datepicker";
class EventSection1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            selectedItem: null,
            isChoseDate: false,
            tab: 'customer',
            searchKey: '',
            currentPage: 0,
            pageSize: 1000000,
            sortBy: 'CreatedDate',
            sortType: 'DES',
            searchKeyC: '',
            currentPageC: 0,
            pageSizeC: 1000000,
            sortByC: 'CreatedDate',
            sortTypeC: 'DES',
            listCustomer: null,
            listUser: null,
        }
        this.handler = this.handler.bind(this)
    }
    handler() {
        this.setState({
            modal: null,
        })
    }
    handleClosePopup() {
        this.setState({ modal: null })
        $('body').removeClass('modal-open');
        this.setState({
            selectedItem: null,
        })
    }
    handleOpenPopup(modal) {
        this.setState({ modal: modal })
        $('body').addClass('modal-open');
    }

    componentDidMount() {
        this.getListCustomer()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.parentProps.user.listCustomer != null & !nextProps.parentProps.user.loading) {
            this.setState({
                listCustomer: nextProps.parentProps.user.listCustomer
            })
        }
        if (nextProps.parentProps.user.listUser != null & !nextProps.parentProps.user.loading) {
            this.setState({
                listUser: nextProps.parentProps.user.listUser
            })
        }
    }
    getListUser() {
        this.props.parentProps.GetListUser(this.state.searchKey, this.state.currentPage, this.state.pageSize, this.state.sortBy, this.state.sortType)
    }
    getListCustomer() {
        this.props.parentProps.GetListCustomer(this.state.searchKeyC, this.state.currentPageC, this.state.pageSizeC, this.state.sortByC, this.state.sortTypeC)
    }
    handleEditItem(item) {
        if (item.accountType == 'Basic') {
            this.setState({
                isChoseDate: false
            })
        }
        else {
            this.setState({
                isChoseDate: true
            })
        }
        this.setState({
            selectedItem: item
        })
        this.handleOpenPopup('create')
    }
    handlePromotion(item) {
        if (item.accountType == 'Basic') {
            this.setState({
                isChoseDate: false
            })
        }
        else {
            this.setState({
                isChoseDate: true
            })
        }
        this.setState({
            selectedItem: item
        })
        setTimeout(() => {
            this.handleOpenPopup('promotion')
        }, 100);
        let updateState = item
        if(!item.expiredDate){
            updateState.expiredDate =  new Date();
        }
        else{
            updateState.expiredDate =  new Date(updateState.expiredDate);
        }
        this.setState({
            selectedItem: updateState
        });
        console.log(this.state.selectedItem)
       
    }
    changeTabUser(evt) {
        this.setState({
            tab: evt.target.value
        })
        if (evt.target.value == 'staff') {
            setTimeout(() => {
                this.getListUser()
            }, 100);
        }
        else {
            setTimeout(() => {
                this.getListCustomer()
            }, 100);
        }
    }
    onChangeSearchInput(evt) {
        if (this.state.tab == 'staff') {
            this.setState({
                searchKey: evt.target.value
            })
            setTimeout(() => {
                this.getListUser()
            }, 100);
        }
        else {
            this.setState({
                searchKeyC: evt.target.value
            })
            setTimeout(() => {
                this.getListCustomer()
            }, 100);
        }
    }
    onChangeExpireDate(date) {
        console.log(date)
        let updateState = this.state.selectedItem
        updateState.expiredDate = date
        this.setState({
            selectedItem: updateState
        });
        console.log(this.state.selectedItem)
    }
    onChangeAccountType(evt) {
        if (evt.target.value == 'Basic') {
            this.setState({
                isChoseDate: false
            })
        }
        else {
            this.setState({
                isChoseDate: true
            })
        }
        let updateState = this.state.selectedItem
        updateState.accountType = evt.target.value
        this.setState({
            selectedItem: updateState
        });
    }
    onUpdateUser() {
        this.props.parentProps.EditUser(this.state.selectedItem, this.callBackClosePop.bind(this))
    }
    callBackClosePop() {
        this.setState({
            modal: null
        })
    }
    deActiveAccount(item){
        let text = item.isActive ? 'Khóa' : 'Mở khóa'
        swal({
            title: 'Thông Báo',
            html: '<p class="pop-content">Bạn chắc chắn muốn <b>' + text + '</b> tài khoản <b><i>' + item.userName + '</i></b> chứ</p>',
            animation: false,
            customClass: 'custom-modal animated zoomIn has-btn',
            showCancelButton: true,
            confirmButtonText: 'Đồng Ý',
            cancelButtonText: 'Hủy',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                item.isActive = !item.isActive
                this.props.parentProps.EditUser(item, this.callBackClosePop.bind(this))
            }
        })
    }
    render() {
        const { modal, searchKey, selectedItem, tab, listCustomer, listUser, isChoseDate } = this.state
        return (
            <React.Fragment>
                <div className="user-page text-center qr-container top-section">
                    <h3 className="light-bold">danh sách <b>người dùng</b></h3>
                    <div className="group-btn">
                        <div className="search-group">
                            <input type="text" placeholder="Nhập thông tin đơn hàng" value={searchKey} onChange={e => this.onChangeSearchInput(e)} />
                        </div>
                        {
                            (this.props.parentProps.currentUser.currentUser && this.props.parentProps.currentUser.currentUser.role === role[0].value) &&
                            <div className="filter-tab">
                                <select name="" id="" value={tab} onChange={e => this.changeTabUser(e)}>
                                    <option value="customer">Khách hàng</option>
                                    <option value="staff">Nhân viên</option>
                                </select>
                            </div>
                        }
                        <a href="javascript:void(0)" className="btn-green float-right" onClick={() => this.handleOpenPopup('create')}>thêm mới</a>
                    </div>
                    <div className="content">
                        {
                            tab === 'staff' &&
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tài khoản</th>
                                        <th>Họ và tên</th>
                                        <th>SĐT</th>
                                        <th>Email</th>
                                        <th>Địa chỉ</th>
                                        <th>Ngày tạo</th>
                                        <th>Loại tài khoản</th>
                                        <th>Trạng thái</th>
                                        <th>thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(listUser) &&
                                        listUser.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.userName}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td>{moment(item.createdDate).utcOffset('+0700').format('DD-MM-YYYY HH:mm')}</td>
                                                <td>{item.accountType === 'Advance' ? 'Tài khoản cao cấp' : 'Tài khoản thường'}</td>
                                                <td>{!item.isActive ? 'Đang hoạt động' : 'Tạm khóa'}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="icon--menu-button" data-toggle="dropdown">
                                                            <span />
                                                            <span />
                                                            <span />
                                                            <span />
                                                        </button>
                                                        <div className="dropdown-menu drop-ico-text">
                                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.handleEditItem(item)}>Sửa</a>
                                                            {
                                                                (this.props.parentProps.currentUser.currentUser && this.props.parentProps.currentUser.currentUser.role === role[0].value) &&
                                                                <React.Fragment>
                                                                    <a className="dropdown-item" href="javascript:void(0)">Xóa</a>
                                                                </React.Fragment>
                                                            }

                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        }
                        {
                            tab === 'customer' &&
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tài khoản</th>
                                        <th>Họ và tên</th>
                                        <th>SĐT</th>
                                        <th>Email</th>
                                        <th>Địa chỉ</th>
                                        <th>Logo</th>
                                        <th>Ngày tạo</th>
                                        <th>Loại tài khoản</th>
                                        <th>Trạng thái</th>
                                        <th>thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(listCustomer) &&
                                        listCustomer.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.userName}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td> <img src={item.avatar} alt={item.avatar}/></td>
                                                <td>{moment(item.createdDate).utcOffset('+0700').format('DD-MM-YYYY HH:mm')}</td>
                                                <td>{item.accountType === 'Advance' ? 'Tài khoản cao cấp' : 'Tài khoản thường'}</td>
                                                <td>{item.isActive ? 'Đang hoạt động' : 'Đang khóa'}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="icon--menu-button" data-toggle="dropdown">
                                                            <span />
                                                            <span />
                                                            <span />
                                                            <span />
                                                        </button>
                                                        <div className="dropdown-menu drop-ico-text">
                                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.handleEditItem(item)}>Sửa</a>
                                                            {
                                                                (this.props.parentProps.currentUser.currentUser && this.props.parentProps.currentUser.currentUser.role === role[0].value) &&
                                                                <React.Fragment>
                                                                    <a className="dropdown-item" href="javascript:void(0)">Xóa</a>
                                                                    {
                                                                        item.isActive ? (
                                                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.deActiveAccount(item)}>Khóa tài khoản</a>
                                                                        ) : (
                                                                                <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.deActiveAccount(item)}>Mở khóa</a>
                                                                            )
                                                                    }
                                                                </React.Fragment>
                                                            }
                                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.handlePromotion(item)}>Nâng cấp</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                {
                    modal === 'create' &&
                    <Modal show={modal === 'create'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                        <h3 className="md-header">Thêm người dùng</h3>
                        <UserCreate handler={this.handler} parentProps={this.props.parentProps} selectedItem={selectedItem}></UserCreate>
                    </Modal>
                }
                <Modal show={modal === 'promotion'} customClass={'pop-full-body'} closeHandler={() => this.handleClosePopup()}>
                    <h3 className="md-header">Nâng cấp tài khoản</h3>
                    {
                        selectedItem &&
                        <div className="promotion-account">
                            <div className="group-text">
                                <label htmlFor="">Loại TK</label>
                                <select value={selectedItem.accountType} onChange={e => this.onChangeAccountType(e)}>
                                    <option value="">Chọn loại tài khoản</option>
                                    {
                                        (accountType) &&
                                        accountType.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                isChoseDate &&
                                <div className="group-text">
                                    <label htmlFor="">Thời hạn</label>
                                    <DatePicker
                                        selected={selectedItem.expiredDate}
                                        onChange={e => this.onChangeExpireDate(e)}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            }
                            <div className="group-btn">
                                <a href="javascript:void(0)">Hủy</a>
                                <a href="javascript:void(0)" onClick={e => this.onUpdateUser()}>Lưu</a>
                            </div>
                        </div>
                    }
                </Modal>
            </React.Fragment>
        )
    }
}

export default EventSection1
