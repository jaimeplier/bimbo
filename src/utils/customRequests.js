import NProgress from 'nprogress';
import xhr from 'xhr';
import errorHandler from './errorHandler';

export function sendPostRequest(url, body, callback, errCallback, hideProgress) {
  if(!hideProgress) NProgress.start();
  xhr.post(url, {json: true, body}, function(err, res, json) {
    if(!hideProgress) NProgress.done();
    if(err) return errorHandler(err, errCallback);
    callback(json);
  })
}

export function sendGetRequest(url, callback, errCallback, hideProgress) {
  if(!hideProgress) NProgress.start();
  xhr.get(url, {json: true}, function(err, res, json) {
    if(!hideProgress) NProgress.done();
    if(err) return errorHandler(err, errCallback);
    callback(json);
  })
}
