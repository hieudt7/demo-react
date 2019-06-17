import React from 'react'
import Modal from 'components/Modal'
import swal from "sweetalert2"
import moment from 'moment'
import Scrollbar from 'react-scrollbars-custom';
import Switch from "react-switch";
import { role, accountType, area } from 'components/common'
import DatePicker from "react-datepicker";
import Pagination from "react-js-pagination";
class EventSection1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            listStamp: null,
            searchKey: '',
            currentPage: 1,
            pageSize: 3,
            sortBy: 'CreatedDate',
            sortType: 'DES',
            isView: false,
            viewItem: null,
            isAnimation: false,
            endDate: new Date(),
            startDate: new Date(moment().date(-30).format("YYYY-MM-DD")),
            listDisplay: [true, true, true, true, true, true, true]
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
        this.getList()
    }
    getList() {
        this.props.homeProp.GetListStamp(this.state.searchKey, this.state.currentPage-1, this.state.pageSize, this.state.sortBy, this.state.sortType, this.state.startDate, this.state.endDate)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.homeProp.home.listStamp != null & !nextProps.homeProp.home.loading) {
            this.setState({
                listStamp: nextProps.homeProp.home.listStamp
            })
        }
    }

    onChangeActive(item, index) {
        let text = item.isActive ? 'Hủy kích hoạt' : 'Kích hoạt'
        swal({
            title: 'Thông Báo',
            html: '<p class="pop-content">Bạn chắc chắn muốn <b>' + text + '</b> lô tem <b><i>' + item.name + '</i></b> chứ</p>',
            animation: false,
            customClass: 'custom-modal animated zoomIn has-btn',
            showCancelButton: true,
            confirmButtonText: 'Đồng Ý',
            cancelButtonText: 'Hủy',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                let updateItem = item
                item.isActive = !item.isActive
                this.props.homeProp.EditStamp(item, this.callBackActive.bind(this))
            }
        })
    }
    callBackActive() {
        let updateState = this.state.listStamp
        this.setState({
            listStamp: updateState
        })
    }
    acceptBill(item, index) {
        swal({
            title: 'Thông Báo',
            html: '<p class="pop-content">Bạn chắc chắn muốn duyệt đơn hàng <b>' + item.name + '</b> chứ</p>',
            animation: false,
            customClass: 'custom-modal animated zoomIn has-btn',
            showCancelButton: true,
            confirmButtonText: 'Đồng Ý',
            cancelButtonText: 'Hủy',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                this.props.homeProp.ApproveStamp(item.id, item.soLuongTem, item.identity, this.callBackApprove.bind(this, index));
            }
        })
    }
    callBackApprove(index) {
        let updateState = this.state.listStamp
        updateState[index].status = true
        this.setState({
            listStamp: updateState
        })
    }
    exportFile(item) {
        let downloadLink = 'http://api.actechplus.com/api/lotem/download/' + item.id
        var link = document.createElement("a");
        link.href = downloadLink;
        link.click();
    }
    onDelete(item) {
        swal({
            title: 'Thông Báo',
            html: '<p class="pop-content">Bạn chắc chắn muốn xóa đơn hàng <b>' + item.name + '</b> chứ</p>',
            animation: false,
            customClass: 'custom-modal animated zoomIn has-btn',
            showCancelButton: true,
            confirmButtonText: 'Đồng Ý',
            cancelButtonText: 'Hủy',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                this.props.homeProp.DeleteStamp(item.id)
            }
        })
    }
    mapArea(value) {
        if (!value) {
            return
        }
        let result = area.filter(obj => {
            return obj.value === value
        })
        return result[0].label
    }
    onChangeSearchInput(evt) {
        this.setState({
            searchKey: evt.target.value
        })
        setTimeout(() => {
            this.getList()
        }, 100);
    }
    checkActiveSort(key) {
        let classSort = ''
        if (key == this.state.sortBy) {

            classSort = this.state.sortType
        }
        return classSort
    }
    sortData(key) {
        let sortType = ''
        if (this.state.sortBy !== key) {
            sortType = 'DES'
        }
        else {
            if (this.state.sortType === 'ASC') {
                sortType = 'DES'
            }
            else {
                sortType = 'ASC'
            }
        }
        this.setState({
            sortBy: key,
            sortType: sortType
        })
        setTimeout(() => {
            this.getList()
        }, 100);
    }
    viewInfo(item) {
        this.setState({
            isView: true,
            viewItem: item
        })
    }
    CloseViewInfo() {
        this.setState({
            isAnimation: true,
        })
        setTimeout(() => {
            this.setState({
                isView: false,
                viewItem: null,
                isAnimation: false,
            })
        }, 800);
    }
    onChangeStartDate(date) {
        this.setState({
            startDate: date
        })
        setTimeout(() => {
            this.getList()
        }, 100);
    }
    onChangeEndDate(date) {
        this.setState({
            endDate: date
        })
        setTimeout(() => {
            this.getList()
        }, 100);
    }
    handlePageChange(pageNumber) {
        console.log(pageNumber)
        this.setState({ currentPage: pageNumber })
        setTimeout(() => {
            this.getList()
        }, 100);
    }
    handleChangeFilter(e, index) {
        let tamp = this.state.listDisplay
        tamp[index] = !tamp[index]
        this.setState({
            listDisplay: tamp
        })
    }
    render() {
        const { modal, listStamp, searchKey, isView, viewItem, isAnimation, startDate, endDate, currentPage, listDisplay,pageSize } = this.state
        console.log(startDate)
        console.log(endDate)
        return (
            <React.Fragment>
                <div className="stamp-list text-center qr-container top-section">
                    <h3 className="light-bold">danh sách <b>lô tem</b></h3>
                    <div className="group-btn">
                        <div className="search-group">
                            <input type="text" placeholder="Nhập thông tin đơn hàng" value={searchKey} onChange={e => this.onChangeSearchInput(e)} />
                        </div>
                        <div className="date-group">
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={startDate}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                onChange={e => this.onChangeStartDate(e)}
                            />
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={endDate}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                onChange={e => this.onChangeEndDate(e)}
                                minDate={startDate}
                            />
                        </div>
                        <a href="javascript:void(0)" className="btn-green float-right" onClick={() => this.props.handler('create', null)}>tạo lô</a>
                    </div>
                    <div className="filter-display">
                        <div class="customUi-checkbox  pb-2">
                            <input id="chk1" type="checkbox" name="agree" onChange={(value) => this.handleChangeFilter(value, 0)} checked={listDisplay[0]} />
                            <label for="chk1">
                                <span class="label-checkbox"></span>
                                <span class="label-helper">Tên Lô</span>
                            </label>
                        </div>
                        <div class="customUi-checkbox  pb-2">
                            <input id="chk2" type="checkbox" name="agree" onChange={(value) => this.handleChangeFilter(value, 1)} checked={listDisplay[1]} />
                            <label for="chk2">
                                <span class="label-checkbox"></span>
                                <span class="label-helper">Ngày Tạo</span>
                            </label>
                        </div>
                        <div class="customUi-checkbox  pb-2">
                            <input id="chk3" type="checkbox" name="agree" onChange={(value) => this.handleChangeFilter(value, 2)} checked={listDisplay[2]} />
                            <label for="chk3">
                                <span class="label-checkbox"></span>
                                <span class="label-helper">Tài Khoản</span>
                            </label>
                        </div>
                        <div class="customUi-checkbox  pb-2">
                            <input id="chk4" type="checkbox" name="agree" onChange={(value) => this.handleChangeFilter(value, 3)} checked={listDisplay[3]} />
                            <label for="chk4">
                                <span class="label-checkbox"></span>
                                <span class="label-helper">Khu Vực</span>
                            </label>
                        </div>
                        <div class="customUi-checkbox  pb-2">
                            <input id="chk5" type="checkbox" name="agree" onChange={(value) => this.handleChangeFilter(value, 4)} checked={listDisplay[4]} />
                            <label for="chk5">
                                <span class="label-checkbox"></span>
                                <span class="label-helper">Số Lượng</span>
                            </label>
                        </div>
                        <div class="customUi-checkbox  pb-2">
                            <input id="chk6" type="checkbox" name="agree" onChange={(value) => this.handleChangeFilter(value, 5)} checked={listDisplay[5]} />
                            <label for="chk6">
                                <span class="label-checkbox"></span>
                                <span class="label-helper">Người Tạo</span>
                            </label>
                        </div>
                        <div class="customUi-checkbox  pb-2">
                            <input id="chk7" type="checkbox" name="agree" onChange={(value) => this.handleChangeFilter(value, 6)} checked={listDisplay[6]} />
                            <label for="chk7">
                                <span class="label-checkbox"></span>
                                <span class="label-helper">Khu Vực</span>
                            </label>
                        </div>
                    </div>
                    <div className="content">
                        <table>
                            <thead>
                                <tr>
                                    {
                                        listDisplay[0] &&
                                        <th>
                                            Tên lô
                                        <a href="javascript:void(0)" className={`sortIcon ${this.checkActiveSort('Name')}`} onClick={() => this.sortData('Name')}>
                                                <span className="sUp"></span><br />
                                                <span className="sDowwn"></span>
                                            </a>
                                        </th>
                                    }
                                    {
                                        listDisplay[1] &&
                                        <th>
                                            Ngày tạo
                                        <a href="javascript:void(0)" className={`sortIcon ${this.checkActiveSort('CreatedDate')}`} onClick={() => this.sortData('CreatedDate')}>
                                                <span className="sUp"></span><br />
                                                <span className="sDowwn"></span>
                                            </a>
                                        </th>
                                    }
                                    {
                                        listDisplay[2] &&
                                        <th>
                                            Tài khoản
                                        <a href="javascript:void(0)" className={`sortIcon ${this.checkActiveSort('CustomerName')}`} onClick={() => this.sortData('CustomerName')}>
                                                <span className="sUp"></span><br />
                                                <span className="sDowwn"></span>
                                            </a>
                                        </th>
                                    }
                                    {
                                        listDisplay[3] &&
                                        <th>
                                            Số lượng
                                        <a href="javascript:void(0)" className={`sortIcon ${this.checkActiveSort('SoLuongTem')}`} onClick={() => this.sortData('SoLuongTem')}>
                                                <span className="sUp"></span><br />
                                                <span className="sDowwn"></span>
                                            </a>
                                        </th>
                                    }
                                    {
                                        listDisplay[4] &&
                                        <th>
                                            Người tạo
                                        <a href="javascript:void(0)" className={`sortIcon ${this.checkActiveSort('CreatedByName')}`} onClick={() => this.sortData('CreatedByName')}>
                                                <span className="sUp"></span><br />
                                                <span className="sDowwn"></span>
                                            </a>
                                        </th>
                                    }
                                    {
                                        listDisplay[5] &&
                                        <th>
                                            Khu vực
                                        <a href="javascript:void(0)" className={`sortIcon ${this.checkActiveSort('KhuVuc')}`} onClick={() => this.sortData('KhuVuc')}>
                                                <span className="sUp"></span><br />
                                                <span className="sDowwn"></span>
                                            </a>
                                        </th>
                                    }
                                    <th>Kích hoạt</th>
                                    {
                                        listDisplay[6] &&
                                        <th>
                                            Trạng thái
                                        <a href="javascript:void(0)" className={`sortIcon ${this.checkActiveSort('Status')}`} onClick={() => this.sortData('Status')}>
                                                <span className="sUp"></span><br />
                                                <span className="sDowwn"></span>
                                            </a>
                                        </th>
                                    }
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (listStamp && listStamp.length > 0) ? (
                                        listStamp.map((item, index) => (
                                            <tr key={index}>
                                                {
                                                    listDisplay[0] &&
                                                    <td><a href="javascript:void(0)" onClick={() => this.viewInfo(item)}>{item.name}</a></td>
                                                }
                                                {
                                                    listDisplay[1] &&
                                                    <td>{moment(item.createdDate).utcOffset('+0700').format('DD-MM-YYYY HH:mm')}</td>
                                                }
                                                {
                                                    listDisplay[2] &&
                                                    <td>{item.customerName}</td>
                                                }
                                                {
                                                    listDisplay[3] &&
                                                    <td>{item.soLuongTem}</td>
                                                }
                                                {
                                                    listDisplay[4] &&
                                                    <td>{item.createdByName}</td>
                                                }
                                                {
                                                    listDisplay[5] &&
                                                    <td>{this.mapArea(item.khuVuc)}</td>
                                                }
                                                <td>
                                                    <span> {item.isActive}</span>
                                                    <label>
                                                        <Switch onChange={() => this.onChangeActive(item, index)} checked={item.isActive} />
                                                    </label>
                                                </td>
                                                {
                                                    listDisplay[6] &&
                                                    <td><span>{!item.status ? 'Chờ Duyệt' : 'Đã Duyệt'}</span></td>
                                                }
                                                <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="icon--menu-button" data-toggle="dropdown">
                                                            <span />
                                                            <span />
                                                            <span />
                                                            <span />
                                                        </button>
                                                        <div className="dropdown-menu drop-ico-text">
                                                            {
                                                                (this.props.homeProp.currentUser.currentUser && this.props.homeProp.currentUser.currentUser.role === role[0].value) &&
                                                                <React.Fragment>
                                                                    {
                                                                        !item.status &&
                                                                        <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.acceptBill(item, index)}>Duyệt Đơn</a>
                                                                    }
                                                                </React.Fragment>
                                                            }
                                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.props.handler('duplicate', item)}>Tạo Thêm Lô</a>
                                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.props.handler('edit', item)}>Sửa</a>
                                                            {
                                                                !item.status &&
                                                                <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.onDelete(item)}>Xóa Đơn</a>
                                                            }
                                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => this.exportFile(item)}>In Tem</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                        )) : (
                                            <tr>
                                                <td colSpan="9">Không có bản ghi nào</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={9}
                            pageRangeDisplayed={5}
                            onChange={(value) => this.handlePageChange(value)}
                        />
                    </div>
                </div>
                {
                    isView && viewItem &&
                    <div className="wrap-pop-info">
                        <div className="close-pop" onClick={() => this.CloseViewInfo()}></div>
                        <div className={`pop-info ${isAnimation ? 'animated fadeOutRight' : 'animated fadeInRight'}`}>
                            <div className="top-info">
                                <h3 className="main-name">{viewItem.name}</h3>
                                <span>{viewItem.soLuongTem} Tem</span>
                                <span>Khu vực {viewItem.khuVuc}</span>
                                <span>{viewItem.soFileExcel} File excel</span>
                            </div>
                            <h4 className="line-breack">Thông tin khách hàng</h4>
                            <div className="group-text">
                                <label htmlFor="">SĐT</label>
                                <input type="text" className="g-input" disabled="disabled" value={viewItem.customerPhone || ''} />
                            </div>
                            <div className="group-text">
                                <label htmlFor="">Email</label>
                                <input type="text" className="g-input" disabled="disabled" value={viewItem.customerEmail || ''} />
                            </div>
                            <div className="group-text">
                                <label htmlFor="">Địa chỉ</label>
                                <input type="text" className="g-input" disabled="disabled" value={viewItem.customerAddress || ''} />
                            </div>
                            <div className="group-text text-left">
                                <label htmlFor="">Thông tin</label>
                                {
                                    viewItem.customerThongTin !== '' ? (
                                        <div dangerouslySetInnerHTML={{ __html: viewItem.customerThongTin }} />
                                    ) : (
                                            <div />
                                        )
                                }
                            </div>
                            <h4 className="line-breack">Thông tin sản phẩm</h4>
                            <div className="group-text">
                                <label htmlFor="">Tên sản phẩm</label>
                                <input type="text" className="g-input" value={viewItem.tenSanPham || ''} disabled="disabled" />
                            </div>
                            <div className="group-text">
                                <label htmlFor="">Hình ảnh</label>
                                <input type="text" className="g-input" value={viewItem.hinhAnh || ''} disabled="disabled" />
                            </div>
                            <div className="group-text text-left">
                                <label htmlFor="">Thông tin</label>
                                <div className="html-inner" dangerouslySetInnerHTML={{ __html: viewItem.thongTinSanPham }} />
                            </div>
                            <h4 className="line-breack">Thông tin lô tem</h4>
                            <div className="group-text">
                                <label htmlFor="">Người tạo</label>
                                <input type="text" className="g-input" value={viewItem.createdByName || ''} disabled="disabled" />
                            </div>
                            <div className="group-text">
                                <label htmlFor="">Ngày tạo</label>
                                <input type="text" className="g-input" value={moment(viewItem.createdDate).utcOffset('+0700').format('DD-MM-YYYY HH:mm') || ''} disabled="disabled" />
                            </div>
                            <div className="group-text">
                                <label htmlFor="">Trạng thái</label>
                                <input type="text" className="g-input" value={!viewItem.status ? 'Chờ Duyệt' : 'Đã Duyệt'} disabled="disabled" />
                            </div>
                            <div className="group-text">
                                <label htmlFor="">Thông tin thanh toán</label>
                                <input type="text" className="g-input" value={!viewItem.daThanhToan ? 'Chưa thanh toán' : 'Đã thanh toán'} disabled="disabled" />
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default EventSection1
