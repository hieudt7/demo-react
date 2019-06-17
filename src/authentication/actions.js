import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from '../components/common'
import cookie from 'js-cookie';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const IS_LOGIN = 'IS_LOGIN'
export const getCurrentUser = (id) => {
  return (dispatch, getState) => {
    // dispatch(isCurrentUserFetching());
    request('api/users/getuserinfo').then(function (response) {
      console.log(response)
      if (response === 'Unauthorized' || response === 'Not Found' || response === '') {
        window.location.href = "/dang-nhap"
      }
      else if (response.success) {
        dispatch(loginSuccess(response));
      } else {
        // dispatch(getCurrentUserError(response))
      }
    })
  }
}

export const isLogin = () => {
    return {
        type: IS_LOGIN
    }
}
export const login = (UserName, Password) => {
    return (dispatch, getState) => {
        dispatch(isLogin());
        request('api/users/authenticate', 'POST', {
            body: JSON.stringify({
                UserName: UserName,
                Password: Password
            })
        }).then(function (response) {
            if (response.success) {
              dispatch(loginSuccess(response));
                cookie.set('csrfUserID', response.data.id);
                cookie.set('csrftoken', response.data.token);
                window.location.href="/";
            } else {
              swal({
                title: 'Lưu ý',
                html: '<p class="pop-content">'+showErrorWithCode(response.message)+'</p>',
                animation: false,
                customClass: 'custom-modal animated zoomIn has-btn',
                showCancelButton: false,
                confirmButtonText: 'Đồng Ý',
                reverseButtons: true,
            })
            }
        })
    }
}
export const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        payload: response.data
    }
}