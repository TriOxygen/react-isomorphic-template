import request from 'axios';
import Config from 'Config';
const { version, host, route } = Config.api;

const API_URL = `http://${host}/${route}/${version}`;

class API {
  constructor() {
    this.url = API_URL;
  }

  get(url) {
    return request.get(`${this.url}/${url}`);
  }

  put(url, data) {
    return request.put(`${this.url}/${url}`, data);
  }

  post(url, data) {
    return request.post(`${this.url}/${url}`, data);
  }

  delete(url) {
    return request.delete(`${this.url}/${url}`);
  }
}

const api = new API();

export default api;