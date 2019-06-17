import request from "lib/request"
import swal from "sweetalert2"
import { showErrorWithCode } from 'components/common'
export const IS_LOADING = 'IS_LOADING'
export const GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS'
export const isLoading = () => {
    return {
        type: IS_LOADING
    }
}
export const getReport = (Id,StartDate,Enddate) => {
    return (dispatch, getState) => {
        dispatch(isLoading());
        request('api/lotem/thongke', 'POST', {
            body: JSON.stringify({
                Id:Id,
                StartDate:StartDate,
                Enddate:Enddate
            })
        }).then(function (response) {
            if (response.success) {
                dispatch(getReportSuccess(response));
            } else {
            }
        })
    }
}
export const getReportSuccess = (response) => {
    return {
        type: GET_REPORT_SUCCESS,
        payload: response.data
    }
}