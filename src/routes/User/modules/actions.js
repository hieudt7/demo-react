import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
export const IS_CREATE_USER = 'IS_CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const IS_GET_USER = 'IS_GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const IS_GET_CUSTOMER = 'IS_GET_CUSTOMER'
export const GET_CUSTOMER_SUCCESS = 'GET_CUSTOMER_SUCCESS'
//create user
export const isCreateUser = () => {
    return {
        type: IS_CREATE_USER
    }
}
export const CreateUser = (User,callback) => {
    return (dispatch, getState) => {
        dispatch(isCreateUser());
        request('api/users/create', 'POST', {
            body: JSON.stringify({
                User
            })
        }).then(function (response) {
            if (response.success) {
                swal({
                    title: 'Thông Báo',
                    html: '<p class="pop-content">Tạo người dùng thành công</p>',
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
                swal({
                    title: 'Thông báo',
                    html: '<p class="pop-content">Tạo tài khoản không thành công</p>',
                    animation: false,
                    confirmButtonText: 'Đóng',
                    customClass: 'custom-modal animated zoomIn'
                })
            }
        })
    }
}
export const CreateUserSuccess = (response) => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: response.dataa
    }
}
//edit user
export const isEditUser = () => {
    return {
        type: IS_CREATE_USER
    }
}
export const EditUser = (User,callback) => {
    return (dispatch, getState) => {
        dispatch(isEditUser());
        request('api/users/update', 'POST', {
            body: JSON.stringify({
                User
            })
        }).then(function (response) {
            if (response.success) {
                swal({
                    title: 'Thông Báo',
                    html: '<p class="pop-content">Cập nhật thông tin người dùng thành công</p>',
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
                swal({
                    title: 'Thông báo',
                    html: '<p class="pop-content">Có lỗi xảy ra. Vui lòng thử lại sau</p>',
                    animation: false,
                    confirmButtonText: 'Đóng',
                    customClass: 'custom-modal animated zoomIn'
                })
            }
        })
    }
}
//list user
export const isGetListUser = () => {
    return {
        type: IS_GET_USER
    }
}
export const GetListUser = (SearchText, CurrentPage, PageSize, SortBy, SortType) => {
    return (dispatch, getState) => {
        dispatch(isGetListUser());
        request('api/users/getstaff', 'POST', {
            body: JSON.stringify({
                SearchText: SearchText,
                CurrentPage: CurrentPage,
                PageSize: PageSize,
                SortBy: SortBy,
                SortType: SortType,
            })
        }).then(function (response) {
            if (response.success) {
                dispatch(GetListUserSuccess(response));
            } else {
            }
        })
    }
}
export const GetListUserSuccess = (response) => {
    return {
        type: GET_USER_SUCCESS,
        payload: response.data
    }
}
//list customer
export const isGetListCustomer = () => {
    return {
        type: IS_GET_CUSTOMER
    }
}
export const GetListCustomer = (SearchText, CurrentPage, PageSize, SortBy, SortType) => {
    return (dispatch, getState) => {
        dispatch(isGetListCustomer());
        request('api/users/getcustomer', 'POST', {
            body: JSON.stringify({
                SearchText: SearchText,
                CurrentPage: CurrentPage,
                PageSize: PageSize,
                SortBy: SortBy,
                SortType: SortType,
            })
        }).then(function (response) {
            if (response.success) {
                dispatch(GetListCustomerSuccess(response));
            } else {
            }
        })
    }
}
export const GetListCustomerSuccess = (response) => {
    return {
        type: GET_CUSTOMER_SUCCESS,
        payload: response.data
    }
}