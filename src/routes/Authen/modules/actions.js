import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
import cookie from 'js-cookie';
export const IS_LOGIN = 'IS_LOGIN'
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
                cookie.set('csrfUserID', response.data.id);
                cookie.set('csrftoken', response.data.token);
                window.location.href="/";
            } else {
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