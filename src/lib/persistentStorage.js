import _localStroage from './localStorage';
import sessionStorage from './sessionStorage';

let storage;

if (process.env.SERVER) {
  storage = sessionStorage;
} else {
  storage = _localStroage;
}

export default storage;
