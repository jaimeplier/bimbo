import Polyglot from 'node-polyglot';
import { sendGetRequest } from './customRequests';

var loaded = false;

var Poly = new Polyglot({
  allowMissing: true,
  onMissingKey: (key) => {
    if(loaded) {
      console.log('warning: ');
      this.warn('Missing translation for key: "' + key + '"'); 
    }
    return key;
  }
});

export function updatePoly() {
  sendGetRequest('/api/users/language', (res) => {
    Poly.extend(res);
    loaded = true;
  }, null, false);
}

updatePoly();

export default Poly;
