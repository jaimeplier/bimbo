import NProgress from 'nprogress';
import xhr from 'xhr';
import errorHandler from './errorHandler';

export function sendPostRequest(url, body, callback, errCallback) {
  NProgress.start();
  xhr.post(url, {json: true, body}, function(err, res, json) {
    NProgress.done();
    if(err) return errorHandler(err, errCallback);
    callback(json);
  })
}

export function sendGetRequest(url, callback, errCallback) {
  NProgress.start();
  xhr.get(url, {json: true}, function(err, res, json) {
    NProgress.done();
    if(err) return errorHandler(err, errCallback);
    callback(json);
  })
}
