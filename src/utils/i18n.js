import Polyglot from 'node-polyglot';
import { sendGetRequest } from './customRequests';

var loaded = false;

var Poly = new Polyglot({
  allowMissing: true,
  onMissingKey: (key) => {
    if(loaded) {
      console.warn('Missing translation for key: "' + key + '"'); 
    }
    return key;
  }
});

export function updatePoly(c) {
  sendGetRequest('/api/users/language', (res) => {
    Poly.extend(res);
    loaded = true;
    c && c();
  }, null, false);
}

export default Poly;
