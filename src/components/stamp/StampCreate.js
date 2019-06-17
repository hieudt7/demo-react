import React from 'react'
import ReactDOM from 'react-dom';
import Modal from 'components/Modal'
import swal from "sweetalert2"
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Select from "react-dropdown-select";
import { area } from 'components/common'
class EventSection1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            currentStep: 1,
            currentText: 'Thông tin User',
            editorState: EditorState.createEmpty(),
            LoTem: {
                name: '',
                customerId: '',
                customerName: '',
                customerPhone: '',
                customerEmail: '',
                customerAddress: '',
                customerThongTin: '',
                soLuongTem: '',
                soFileExcel: '',
                khuVuc: '',
                mauMenu: '',
                mauTitle: '',
                backgroud: '',
                tenSanPham: '',
                thongTinSanPham: '',
                hinhAnh: '',
                createdById: '',
                createdByName: '',
                identity: 0,
                status: false,
                isActive: false,
            }
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
        if (this.props.itemSelected) {
            this.setState({
                LoTem: this.props.itemSelected,
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(this.props.itemSelected.thongTinSanPham)
                    )
                ),
            })
        }
        if (this.props.homeProp.currentUser.currentUser != null && !this.props.itemSelected) {
            let currentState = this.state.LoTem
            currentState.createdById = this.props.homeProp.currentUser.currentUser.id
            currentState.createdByName = this.props.homeProp.currentUser.currentUser.fullName
            this.setState({
                LoTem: currentState,
            })
        }
        this.getListCustomer('', 0, 1000000, 'CreatedDate', 'DES')
    }
    getListCustomer(SearchText, CurrentPage, PageSize, SortBy, SortType) {
        this.props.homeProp.GetListCustomer(SearchText, CurrentPage, PageSize, SortBy, SortType)
    }
    componentWillReceiveProps(nextProps) {
    }
    setActiveTab(text, nextStep) {
        this.setState({
            currentStep: nextStep,
            currentText: text
        })
    }
    handleCreate() {
        this.props.homeProp.CreateStamp(this.state.LoTem,this.callBackReturn.bind(this))
    }
    handleEdit() {
        this.props.homeProp.EditStamp(this.state.LoTem,this.callBackEditSuccess.bind(this))
    }
    callBackReturn(){
        this.props.handler('list', null)
    }
    callBackEditSuccess(){
        let $this = this
        swal({
            title: 'Thông Báo',
            html: '<p class="pop-content">Cập nhật thông tin thành công</p>',
            animation: false,
            customClass: 'custom-modal animated zoomIn has-btn',
            showCancelButton: false,
            confirmButtonText: 'Đồng Ý',
            reverseButtons: true,
            timer: 1500
        }).then((result) => {
            $this.props.handler('list', null)
        })
        setTimeout(() => {
            $this.props.handler('list', null)
        }, 1500);
    }
    onEditorStateChange = (editorState) => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        let updateState = this.state.LoTem
        updateState.thongTinSanPham = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.setState({
            editorState: editorState,
            LoTem: updateState
        })
    }


    onChangeValueState(evt, type) {
        let updateState = this.state.LoTem
        updateState[type] = evt.target.value
        this.setState({
            LoTem: updateState
        })
    }
    onChangeCustomer(value) {
        console.log(value)
        if (value.length <= 0) {
            return
        }
        let updateState = this.state.LoTem
        updateState.customerPhone = value[0].phone
        updateState.customerAddress = value[0].address
        updateState.customerEmail = value[0].email
        updateState.customerId = value[0].id
        updateState.customerName = value[0].fullName
        updateState.customerThongTin = value[0].thongTin
        this.setState({
            LoTem: updateState
        })
    }
    render() {
        const { modal, isMobile, currentStep, currentText, editorState, LoTem } = this.state
        return (
            <React.Fragment>
                <div className="stamp-create top-section">
                    <div className="create-container">
                        {
                            this.props.itemSelected ? (
                                <h3 className="light-bold">Sửa <b>lô tem</b></h3>
                            ) : (
                                    <h3 className="light-bold">tạo <b>lô tem</b></h3>
                                )
                        }
                        <div className="step-wrapper">
                            <ul className="s-step">
                                <li>
                                    <a href="javascript:void(0)" onClick={e => this.setActiveTab('Thông tin User', 1)}>Thông tin User</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" onClick={e => this.setActiveTab('Thông tin sản phẩm', 2)}>Thông tin sản phẩm</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" onClick={e => this.setActiveTab('Giao diện', 3)}>Giao diện</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" onClick={e => this.setActiveTab('Thông tin lô', 4)}>Thông tin lô</a>
                                </li>
                            </ul>
                            <a className={`active-menu ${'step-' + currentStep}`}>{currentText}</a>
                        </div>
                        <div className="step-conten">
                            {
                                (currentStep === 1) &&
                                <div className="step-1">
                                    <div className="group-text">
                                        <label htmlFor="">Người dùng</label>
                                        {
                                            this.props.homeProp.home.customer &&
                                            <Select
                                                options={this.props.homeProp.home.customer}
                                                labelField={'fullName'}
                                                valueField={'id'}
                                                searchBy={'fullName'}
                                                values={[]}
                                                onChange={(value) => this.onChangeCustomer(value)}
                                            />
                                        }

                                    </div>
                                    <div className="group-text">
                                        <label htmlFor="">SĐT</label>
                                        <input type="text" className="g-input" disabled="disabled" value={LoTem.customerPhone || ''} />
                                    </div>
                                    <div className="group-text">
                                        <label htmlFor="">Email</label>
                                        <input type="text" className="g-input" disabled="disabled" value={LoTem.customerEmail || ''} />
                                    </div>
                                    <div className="group-text">
                                        <label htmlFor="">Địa chỉ</label>
                                        <input type="text" className="g-input" disabled="disabled" value={LoTem.customerAddress || ''} />
                                    </div>
                                    <div className="group-text text-left">
                                        <label htmlFor="">Thông tin</label>
                                        {
                                            LoTem.customerThongTin !== '' ? (
                                                <div dangerouslySetInnerHTML={{ __html: LoTem.customerThongTin }} />
                                            ) : (
                                                    <div />
                                                )
                                        }
                                    </div>
                                </div>
                            }
                            {
                                (currentStep === 2) &&
                                <div className="step-2">
                                    <div className="group-text">
                                        <label htmlFor="">Tên sản phẩm</label>
                                        <input type="text" className="g-input" value={LoTem.tenSanPham || ''} onChange={e => this.onChangeValueState(e, 'tenSanPham')} />
                                    </div>
                                    <div className="group-text">
                                        <label htmlFor="">Hình ảnh</label>
                                        <input type="text" className="g-input" value={LoTem.hinhAnh || ''} onChange={e => this.onChangeValueState(e, 'hinhAnh')} />
                                    </div>
                                    <div className="group-text text-left">
                                        <label htmlFor="">Thông tin</label>
                                        <Editor
                                            editorState={editorState}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={this.onEditorStateChange}
                                        />
                                    </div>
                                </div>
                            }
                            {
                                (currentStep === 3) &&
                                <div className="step-3">
                                    <div className="group-text">
                                        <label htmlFor="">Màu menu</label>
                                        <input type="text" className="g-input" value={LoTem.mauMenu || ''} onChange={e => this.onChangeValueState(e, 'mauMenu')} />
                                    </div>
                                    <div className="group-text">
                                        <label htmlFor="">Màu title</label>
                                        <input type="text" className="g-input" value={LoTem.mauTitle || ''} onChange={e => this.onChangeValueState(e, 'mauTitle')} />
                                    </div>
                                    <div className="group-text">
                                        <label htmlFor="">Màu background</label>
                                        <input type="text" className="g-input" value={LoTem.backgroud || ''} onChange={e => this.onChangeValueState(e, 'backgroud')} />
                                    </div>
                                    <div className="group-text">
                                        <label htmlFor="">Background</label>
                                    </div>
                                </div>
                            }
                            {
                                (currentStep === 4) &&
                                <div className="step-4">
                                    {
                                        this.props.stampState === 'edit' && this.props.itemSelected.status ? (
                                            <React.Fragment>
                                                <div className="group-text">
                                                    <label htmlFor="">Tên lô</label>
                                                    <input type="text" className="g-input" value={LoTem.name} disabled />
                                                </div>
                                                <div className="group-text">
                                                    <label htmlFor="">Số lượng tem</label>
                                                    <input type="text" className="g-input" value={LoTem.soLuongTem} disabled />
                                                </div>
                                                <div className="group-text">
                                                    <label htmlFor="">Số file excel</label>
                                                    <input type="text" className="g-input" value={LoTem.soFileExcel} disabled />
                                                </div>
                                                <div className="group-text">
                                                    <label htmlFor="">Khu vực</label>
                                                    <select name="" id="" value={LoTem.khuVuc} disabled>
                                                        <option value="">Chọn khu vực tem</option>
                                                        {
                                                            (area) &&
                                                            area.map((item, index) => (
                                                                <option key={index} value={item.value}>{item.label}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                                <React.Fragment>
                                                    <div className="group-text">
                                                        <label htmlFor="">Tên lô</label>
                                                        <input type="text" className="g-input" value={LoTem.name} onChange={e => this.onChangeValueState(e, 'name')} />
                                                    </div>
                                                    <div className="group-text">
                                                        <label htmlFor="">Số lượng tem</label>
                                                        <input type="text" className="g-input" value={LoTem.soLuongTem} onChange={e => this.onChangeValueState(e, 'soLuongTem')} />
                                                    </div>
                                                    <div className="group-text">
                                                        <label htmlFor="">Số file excel</label>
                                                        <input type="text" className="g-input" value={LoTem.soFileExcel} onChange={e => this.onChangeValueState(e, 'soFileExcel')} />
                                                    </div>
                                                    <div className="group-text">
                                                        <label htmlFor="">Khu vực</label>
                                                        <select name="" id="" value={LoTem.khuVuc} onChange={e => this.onChangeValueState(e, 'khuVuc')}>
                                                            <option value="">Chọn khu vực tem</option>
                                                            {
                                                                (area) &&
                                                                area.map((item, index) => (
                                                                    <option key={index} value={item.value}>{item.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </React.Fragment>
                                            )
                                    }

                                </div>
                            }

                        </div>
                        <div className="step-action clearfix">
                            {
                                currentStep == 1 ? (
                                    <a href="javascript:void(0)" className="btn-green-outline float-left disable-gray">quay lại</a>
                                ) : (
                                        <a href="javascript:void(0)" className="btn-green-outline float-left" onClick={e => this.setState({ currentStep: currentStep - 1 })}>quay lại</a>
                                    )
                            }
                            {
                                currentStep == 4 ? (

                                    <React.Fragment>
                                        {
                                            this.props.stampState === 'create' ? (
                                                <a href="javascript:void(0)" className="btn-green float-right" onClick={e => this.handleCreate()}>tạo lô</a>
                                            ) : (
                                                    this.props.stampState === 'duplicate' ? (
                                                        <a href="javascript:void(0)" className="btn-green float-right" onClick={e => this.handleCreate()}>Tạo lô</a>
                                                    ) : (
                                                            <a href="javascript:void(0)" className="btn-green float-right" onClick={e => this.handleEdit()}>Sửa lô</a>
                                                        )
                                                )
                                        }
                                    </React.Fragment>
                                ) : (
                                        <a href="javascript:void(0)" className="btn-green float-right" onClick={e => this.setState({ currentStep: currentStep + 1 })}>tiếp tục</a>
                                    )
                            }


                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default EventSection1
