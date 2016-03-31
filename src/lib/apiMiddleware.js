import api from 'lib/api';

export default function apiMiddleware (store) {
  return next => action => {
    const { apiCall, checkCache, type, ...rest } = action;

    if (!apiCall) return next(action);

    const SUCCESS = type;
    const REQUEST = type + '/request';
    const FAILURE = type + '/fail';

    if (checkCache) {
      const cachedResponse = checkCache(store.getState());
      if (cachedResponse) {

        return new Promise((resolve) => {
          resolve(cachedResponse);
        }).then(data => {
          next({ ...rest, data, type: SUCCESS });
          return {
            error: false,
            data
          };
        })
      }
    }

    next({ ...rest, type: REQUEST });

    return apiCall(api)
      .then(res => {
        const response = res.data;
        next({ ...rest, data: response.data, type: SUCCESS });
        return {
          error: false,
          message: response.message,
          data: response.data,
        };
      })
      .catch(res => {
        next({ ...rest, res, type: FAILURE });
        return {
          error: res.data && res.data.error || true,
          message: res.data && res.data.message,
        }
      });

  };
}
