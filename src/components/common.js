export function showErrorWithCode(errCode) {
  let errorMess
  switch (errCode) {
    case 'Incorrect username or password':
      errorMess = 'Tên đăng nhập hoặc tài khoản không đúng.'
      break;

    default:
      errorMess = errCode;
      break;
  }
  return errorMess
}


export function smoothScroll(target) {
  if (!target) {
    return
  }
  $('html,body').stop().animate({
    scrollTop: $(target).offset().top
  }, 1000);
}
export const role = [
  {value:'Admin',label:'Quản trị viên'},
  {value:'Staff',label:'Nhân viên sale'},
  {value:'Customer',label:'Khách hàng'},
]
export const accountType = [
  {value:'Basic',label:'Tài khoản thường'},
  {value:'Advance',label:'Tài khoản nâng cao'},
]
export const area = [
  {value:'MienBac',label:'Miền Bắc'},
  {value:'MienTrung',label:'Miền Trung'},
  {value:'MienNam',label:'Miền Nam'}
]