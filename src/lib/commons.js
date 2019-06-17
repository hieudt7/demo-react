import config from "config/app.js";
import autoRedux from './autoRedux.js';

/**
* Socket IO client. The value should be set in redux/realtime.js
*/
window.raffleSocket = null;

/**
* Example: Commons.getSocket().emit('sample-event', {message: 'Hello Vietnam'})
*/
let getSocket = () => {
  return window.raffleSocket;
}

let isInteger = (number) => {
  let numberInt = parseInt(number)
  return numberInt == number
}

let isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const range = (start, end) => Array.from({length: (end - start + 1)}, (v, k) => k + start);

const toObj = (array, key) => {
  var result = array.reduce(function(map, obj) {
    map[obj[key]] = obj;
    return map;
  }, {});

  return result;
}

const openModal = () => {
  $('body').addClass('modal-open');
  $('.modal-backdrop').show().addClass('show');
  $('#modal-rewards').show().addClass('show');
  return false;
}

const closeModal = (event) => {
  event.preventDefault();
  $('body').removeClass('modal-open');
  $('body').css('paddingRight', '0');
  $('.modal-backdrop').hide().removeClass('show');
  $('#modal-rewards').hide().removeClass('show');
  return false;
}

const getLang = (language, path) => require(`lng/${language}`).default

const secondsToTime = (secs) => {
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

const pagination = (items, page, per_page) => {
 
  var page = page || 1,
  per_page = per_page || 10,
  offset = (page - 1) * per_page,
 
  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
  };
}
const paginationAll = (items, per_page = 6) => {
  let total_pages = Math.ceil(items.length / per_page);
  let pagingItems = []
  if(total_pages >= 1) {
    for (let index = 1; index <= total_pages; index++) {
      let offset = (index - 1) * per_page
      let paginatedItems = items.slice(offset).slice(0, per_page)
      pagingItems.push(paginatedItems)
    }
  }

  return pagingItems
}

export default {
  post: autoRedux.post,
  get: autoRedux.get,
  autoPost: autoRedux.autoPost,
  autoGet: autoRedux.autoGet,
  getLang,
  getSocket,
  isInteger,
  isJsonString,
  range,
  toObj,
  openModal,
  closeModal,
  secondsToTime,
  pagination,
  paginationAll
}
