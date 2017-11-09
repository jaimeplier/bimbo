import Polyglot from 'node-polyglot';
import { sendGetRequest } from './customRequests';

var Poly = new Polyglot();

export function updatePoly() {
  sendGetRequest('/api/users/language', (res) => {
    Poly.extend(res);
  }, null, false);
}

updatePoly();

export default Poly;
