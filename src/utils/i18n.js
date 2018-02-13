// TODO: Should probably change the export name
// from Poly to i18n.
import Polyglot from 'node-polyglot';
import { sendGetRequest } from './customRequests';

let loaded = false;

const Poly = new Polyglot({
  allowMissing: true,
  onMissingKey: (key) => {
    if (loaded) {
      console.warn(`Missing translation for key: "${key}"`);
    }
    return key;
  },
});

// eslint-disable-next-line
export var languageObject = {};

export function updatePoly(c) {
  sendGetRequest('/api/users/language', (res) => {
    languageObject = res;
    Poly.extend(res);
    loaded = true;
    c();
  }, null, false);
}

export default Poly;
