export default function promiseMiddleware () {
  return next => action => {
    const { promise, type, errorMessage, successMessage, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type;

    const REQUEST = type + '/request';
    const FAILURE = type + '/fail';

    next({ ...rest, type: REQUEST });

    return promise
      .then(res => {
        const response = res.data;
        next({ ...rest, data: response.data, type: SUCCESS });
        if (response.error && errorMessage ) {
          next({ message: errorMessage, type: 'userMessage/add' } )
        } else if (!response.error && successMessage) {
          next({ message: successMessage, type: 'userMessage/add' } )
        } else if (response.message) {
          next({ message: response.message, type: 'userMessage/add' } )
        }
        return true;
      })
      .catch(res => {
        next({ ...rest, res, type: FAILURE });
        if (errorMessage) {
          next({ message: errorMessage, type: 'userMessage/add' } )
        } else if (res.data && res.data.message) {
          next({ message: res.data.message, type: 'userMessage/add' })
        }
        return false;
      });
  };
}
