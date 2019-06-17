import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
import cookie from 'js-cookie';
export const IS_SCAN = 'IS_SCAN'
export const SCAN_SUCCESS = 'SCAN_SUCCESS'
export const VERYFI_SUCCESS = 'VERYFI_SUCCESS'
export const isScan = () => {
    return {
        type: IS_SCAN
    }
}
export const Scan = (Id) => {
    return (dispatch, getState) => {
        dispatch(isScan());
        request('api/tem/scan/'+Id).then(function (response) {
            if (response.success) {
                dispatch(ScanSuccess(response));
            } else {
            }
        })
    }
}
export const ScanSuccess = (response) => {
    return {
        type: SCAN_SUCCESS,
        payload: response.data
    }
}

export const verify = (Id,MaXacThuc) => {
    return (dispatch, getState) => {
        dispatch(isScan());
        request('api/tem/xacthuc', 'POST', {
            body: JSON.stringify({
                Id: Id,
                MaXacThuc: MaXacThuc,
            })
        }).then(function (response) {
            if (response.success) {
                dispatch(ScanSuccess(response))
                if(response.data.xacThuc.length<2){
                    swal({
                        title: 'Chúc mừng',
                        html: '<p class="pop-content">Chúc mừng bạn! Đây là sản phẩm chính hãng.</p>',
                        animation: false,
                        customClass: 'custom-modal animated zoomIn has-btn',
                        showCancelButton: false,
                        confirmButtonText: 'Đồng Ý',
                        reverseButtons: true,
                        timer: 6500
                    })
                }
                else{
                    swal({
                        title: 'Lưu ý',
                        html: '<p class="pop-content">Mã này đã được xác thực hoặc không tồn tại trong hệ thống. Bạn nên cân nhắc trước khi sử dụng</p>',
                        animation: false,
                        customClass: 'custom-modal animated zoomIn has-btn',
                        showCancelButton: false,
                        confirmButtonText: 'Đồng Ý',
                        reverseButtons: true,
                        timer: 6500
                    })
                }
            } else {
            }
        })
    }
}

