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
        next({ ...rest, data: res.data.data, type: SUCCESS });
        if (res.data.message) {
          next({ message: res.data.message, type: 'userMessage/add' } )
        }
        return true;
      })
      .catch(res => {
        next({ ...rest, res, type: FAILURE });
        if (res.data.error.message) {
          next({ message: res.data.error.message, type: 'userMessage/add' } )
        }
        return false;
      });
  };
}
