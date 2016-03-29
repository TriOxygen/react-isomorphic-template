export default function promiseMiddleware () {
  return next => action => {
    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type;

    const REQUEST = type + '/request';
    const FAILURE = type + '/fail';

    next({ ...rest, type: REQUEST });

    return promise
      .then(res => {
        const response = res.data;
        next({ ...rest, data: response.data, type: SUCCESS });
        return {
          error: false,
          message: response.message,
          data: res.data,
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
