import config from "config/app.js";
import cookie from 'js-cookie';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if(response.status >= 200 && response.status < 300) {
    return response.json();
  }
  else{
    return response;
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  // return response;
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  // throw error;
  return error.response.statusText
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, method, options) {
  //get token from param
  //let params = new URLSearchParams(document.location.search.substring(1))
  //let token = params.get("token")
  var initOptions = {
    method: method !== undefined ? method : 'GET',
    headers: {
      'Authorization': 'Bearer '+ cookie.get('csrftoken'),
      'Content-Type': 'application/json'
    },
    // credentials: 'include'
  }
  var opts = Object.assign(initOptions, options);

  if (url.indexOf("http") > -1) {
    url = url;
  } else {
    url = config.apiUrl + url;
  }

  return fetch(url, opts)
    .then(checkStatus)
    .then(parseJSON);
}
