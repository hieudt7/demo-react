import React from 'react'
import Footer from 'layouts/PageLayout/Footer'
import Modal from 'components/Modal'
import swal from "sweetalert2"
import { role, accountType } from 'components/common'
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DatePicker from "react-datepicker";
class EventSection1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: null,
            isMobile: false,
            isChoseDate: false,
            editorState: EditorState.createEmpty(),
            PInfo: '',
            isEdit: false,
            user: {
                accountType: '',
                address: '',
                email: '',
                expiredDate: '',
                fullName: '',
                id: null,
                isActive: true,
                phone: '',
                role: 'Customer',
                expiredStatus: '',
                thongTin: '',
                userName: '',
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
        if (this.props.selectedItem != null) {
            this.setState({
                isEdit: true,
                user: this.props.selectedItem,
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(this.props.selectedItem.thongTin)
                    )
                ),
            })
            if (this.props.selectedItem.accountType == 'Basic') {
                this.setState({
                    isChoseDate: false
                })
            }
            else {
                this.setState({
                    isChoseDate: true
                })
            }
        }
    }
    componentWillReceiveProps(nextProps) {
    }
    onEditorStateChange = (editorState) => {
        let updateState = this.state.user
        updateState.thongTin = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        this.setState({
            editorState: editorState,
            user: updateState
        })
    }
    onChangeValueState(evt, type) {
        let updateState = this.state.user
        updateState[type] = evt.target.value
        this.setState({
            user: updateState
        })
    }
    onCreateUser() {
        this.props.parentProps.CreateUser(this.state.user, this.callBackClosePop.bind(this))
    }
    onUpdateUser() {
        this.props.parentProps.EditUser(this.state.user, this.callBackClosePop.bind(this))
    }
    callBackClosePop() {
        this.props.handler()
    }
    onChangeExpireDate(date) {
        let updateState = this.state.user
        // updateState.expiredDate = moment(date).toISOString()
        updateState.expiredDate = date
        this.setState({
            user: updateState
        });
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
        let updateState = this.state.user
        updateState.accountType = evt.target.value
        this.setState({
            user: updateState
        });
    }
    render() {
        const { modal, editorState, PInfo, user, isEdit, isChoseDate } = this.state
        return (
            <React.Fragment>
                <div className="add-user top-section">
                    <div className="group-text">
                        <label htmlFor="">Tài Khoản</label>
                        <input type="text" className="g-input" value={user.userName} onChange={e => this.onChangeValueState(e, 'userName')} />
                    </div>
                    <div className="group-text">
                        <label htmlFor="">Họ và tên</label>
                        <input type="text" className="g-input" value={user.fullName} onChange={e => this.onChangeValueState(e, 'fullName')} />
                    </div>
                    <div className="group-text">
                        <label htmlFor="">SĐT</label>
                        <input type="text" className="g-input" value={user.phone} onChange={e => this.onChangeValueState(e, 'phone')} pattern="[0-9]*" />
                    </div>
                    <div className="group-text">
                        <label htmlFor="">Email</label>
                        <input type="text" className="g-input" value={user.email} onChange={e => this.onChangeValueState(e, 'email')} />
                    </div>
                    <div className="group-text">
                        <label htmlFor="">Địa chỉ</label>
                        <textarea className="g-input" name="" id="" cols="30" rows="5" value={user.address} onChange={e => this.onChangeValueState(e, 'address')}></textarea>
                    </div>
                    <div className="group-text">
                        <label htmlFor="">Logo</label>
                        <input type="text" className="g-input" value={user.avatar} onChange={e => this.onChangeValueState(e, 'avatar')} />
                    </div>
                    {
                        (this.props.parentProps.currentUser.currentUser && this.props.parentProps.currentUser.currentUser.role === role[0].value) &&
                        <div className="group-text">
                            <label htmlFor="">Phân Quyền</label>
                            <select name="" id="" value={user.role} onChange={e => this.onChangeValueState(e, 'role')}>
                                <option value="">Chọn loại tài khoản</option>
                                {
                                    (role) &&
                                    role.map((item, index) => (
                                        <option key={index} value={item.value}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }
                    <div className="group-text">
                        <label htmlFor="">Loại TK</label>
                        <select value={user.accountType} onChange={e => this.onChangeAccountType(e)}>
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
                                selected={user.expiredDate}
                                onChange={e => this.onChangeExpireDate(e)}
                            />
                        </div>
                    }
                    <div className="group-text">
                        <label htmlFor="">Thông tin</label>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                    <div className="gr-btn text-center">
                        <a href="javascript:void(0)">Hủy</a>
                        {
                            isEdit ? (
                                <a href="javascript:void(0)" onClick={e => this.onUpdateUser()}>Sửa</a>
                            ) : (
                                    <a href="javascript:void(0)" onClick={e => this.onCreateUser()}>Tạo</a>
                                )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EventSection1
