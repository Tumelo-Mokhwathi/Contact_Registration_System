import Axios from 'axios';

const reloadAffectingAction = (options) => {
  options.context.commit(options.loadingMutation, true);
  const requestObj = {
    config: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    method: options.actionVerb,
    url: options.actionUrl,
  };

  if (options.dataPayload) {
    requestObj.data = options.dataPayload;
  }

  Axios(requestObj)
    .then(() => {
      options.resolve();
      if (options.loadActionPayload) {
        options.context.dispatch(options.loadAction, options.loadActionPayload);
      } else {
        options.context.dispatch(options.loadAction);
      }
    })
    .catch((error) => {
      options.reject(error.response.data.message);
    })
    .finally(() => {
      options.context.commit(options.loadingMutation, false);
    });
};

export default {
  reloadAffectingAction,
};
