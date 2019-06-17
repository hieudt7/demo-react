import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
export const IS_CREATE_STAMP = 'IS_CREATE_STAMP'
export const CREATE_STAMP_SUCCESS = 'CREATE_STAMP_SUCCESS'
export const IS_GET_STAMP = 'IS_GET_STAMP'
export const GET_STAMP_SUCCESS = 'GET_STAMP_SUCCESS'
export const IS_PRINT_STAMP = 'IS_PRINT_STAMP'
export const PRINT_STAMP_SUCCESS = 'PRINT_STAMP_SUCCESS'
export const IS_DELETE_STAMP = 'IS_DELETE_STAMP'
export const DELETE_STAMP_SUCCESS = 'DELETE_STAMP_SUCCESS'


//create stamp
export const isCreateStamp = () => {
    return {
        type: IS_CREATE_STAMP
    }
}
export const CreateStamp = (LoTem, callback) => {
    return (dispatch, getState) => {
        dispatch(isCreateStamp());
        request('api/lotem/create', 'POST', {
            body: JSON.stringify({
                LoTem
            })
        }).then(function (response) {
            if (response.success) {
                swal({
                    title: 'Thông Báo',
                    html: '<p class="pop-content">Tạo Thành Công</p>',
                    animation: false,
                    customClass: 'custom-modal animated zoomIn has-btn',
                    showCancelButton: false,
                    confirmButtonText: 'Đồng Ý',
                    reverseButtons: true,
                    timer: 1500
                }).then((result) => {
                    callback()
                })
                setTimeout(() => {
                    callback()
                }, 1500);
            } else {
                console.log('lỗi')
                swal({
                    title: 'Lưu ý',
                    html: '<p class="pop-content">Có lỗi xảy ra</p>',
                    animation: false,
                    customClass: 'custom-modal animated zoomIn has-btn',
                    showCancelButton: false,
                    confirmButtonText: 'Đồng Ý',
                    reverseButtons: true,
                    timer: 1500
                }).then((result) => {
                    callback()
                })
                setTimeout(() => {
                    callback()
                }, 1500);
            }
        })
    }
}
//edit stamp
export const EditStamp = (LoTem, callback) => {
    return (dispatch, getState) => {
        dispatch(isCreateStamp());
        console.log(LoTem)
        request('api/lotem/update', 'POST', {
            body: JSON.stringify({
                LoTem
            })
        }).then(function (response) {
            if (response.success) {
                callback()
            } else {
                alert(response.message)
            }
        })
    }
}
//list stamp
export const isGetListStamp = () => {
    return {
        type: IS_GET_STAMP
    }
}
export const GetListStamp = (SearchText, CurrentPage, PageSize, SortBy, SortType,From,To) => {
    return (dispatch, getState) => {
        dispatch(isGetListStamp());
        request('api/lotem/search', 'POST', {
            body: JSON.stringify({
                SearchText: SearchText,
                CurrentPage: CurrentPage,
                PageSize: PageSize,
                SortBy: SortBy,
                SortType: SortType,
                From:From,
                To:To
            })
        }).then(function (response) {
            if (response === 'Unauthorized') {
                console.log('chưa đăng nhập')
            }
            else if (response.success) {
                dispatch(GetListStampSuccess(response));
            }
        })
    }
}
export const GetListStampSuccess = (response) => {
    return {
        type: GET_STAMP_SUCCESS,
        payload: response.data
    }
}
//print stamp
export const isPrintStamp = () => {
    return {
        type: IS_PRINT_STAMP
    }
}
export const PrintStamp = (Id) => {
    return (dispatch, getState) => {
        dispatch(isPrintStamp());
        request('api/lotem/download/'+Id).then(function (response) {
            if (response.success) {
                console.log(response)
                // dispatch(PrintStampSuccess(response));
            } else {
                alert(response.message)
            }
        })
    }
}
export const PrintStampSuccess = (response) => {
    return {
        type: PRINT_STAMP_SUCCESS,
        payload: response.data
    }
}
//delete stamp
export const isDeleteStamp = () => {
    return {
        type: IS_DELETE_STAMP
    }
}
export const DeleteStamp = (Id) => {
    return (dispatch, getState) => {
        dispatch(isDeleteStamp());
        request('api/lotem/delete', 'POST', {
            body: JSON.stringify({
                Id: Id,
            })
        }).then(function (response) {
            if (response.success) {
                swal({
                    title: 'Thông Báo',
                    html: '<p class="pop-content">Xóa thành công</p>',
                    animation: false,
                    customClass: 'custom-modal animated zoomIn has-btn',
                    confirmButtonText: 'Đồng Ý',
                    reverseButtons: true,
                })
            } else {
                alert(response.message)
            }
        })
    }
}
export const DeleteStampSuccess = (response) => {
    return {
        type: DELETE_STAMP_SUCCESS,
        payload: response.data
    }
}
//duyet tem
export const ApproveStamp = (Id, SoLuongTem, Identity,callback) => {
    return (dispatch, getState) => {
        dispatch(isCreateStamp());
        request('api/lotem/duyet', 'POST', {
            body: JSON.stringify({
                Id: Id,
                SoLuongTem: SoLuongTem,
                Identity: Identity
            })
        }).then(function (response) {
            if (response.success) {
                callback()
            } else {
                console.log('lỗi')
                alert(response.message)
            }
        })
    }
}
export const ApproveStampSuccess = (response) => {
    return {
        type: DELETE_STAMP_SUCCESS,
        payload: response.data
    }
}