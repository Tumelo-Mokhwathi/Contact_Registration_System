import Axios from 'axios';
import router from '@/router/index';
import ActionUtilities from '@/store/utilities/actions';
import GetterUtilities from '@/store/utilities/getters';
import MutationUtilities from '@/store/utilities/mutations';

const baseUrl = `${process.env.VUE_APP_ROOT_API}`;

const actions = {
  Login: (context, payload) => new Promise((resolve, reject) => {
    context.commit('SetLoading', true);
    const request = {
      url: `${baseUrl}/login_check`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    };
    Axios(request)
      .then((response) => {
        context.commit('SetUser', response.data.email);
        context.commit('SetToken', response.data.token);
        context.commit('SetIsSignedIn', true);
        router.push({ name: 'Admin' });
        resolve();
      })
      .catch(() => {
        context.commit('SetErrorMessage', 'Invalid Email or Password!');
        context.commit('SetHasError', true);
        reject();
      })
      .finally(() => {
        context.commit('SetLoading', false);
      });
  }),
  Register: (context, payload) => new Promise((resolve, reject) => {
    const options = {
      actionVerb: 'post',
      actionUrl: `${baseUrl}/register`,
      context,
      dataPayload: payload,
      loadAction: 'LoadContacts',
      loadingMutation: 'SetLoading',
      resolve,
      reject,
    };
    ActionUtilities.reloadAffectingAction(options);
  }),
  LoadContacts: (context) => new Promise((resolve, reject) => {
    context.commit('SetLoading', true);
    context.commit('SetData', null);
    const request = {
      url: `${process.env.VUE_APP_ROOT_API}/users`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    Axios(request)
      .then((response) => {
        context.commit('SetData', response.data['hydra:member']);
        resolve();
      })
      .catch(() => {
        reject();
      })
      .finally(() => {
        context.commit('SetLoading', false);
      });
  }),
};
const getters = {
  Data: GetterUtilities.get('data'),
  ErrorMessage: GetterUtilities.get('errorMessage'),
  IsSignedIn: GetterUtilities.get('isSignedIn'),
  HasError: GetterUtilities.get('hasError'),
  Loading: GetterUtilities.get('loading'),
  User: GetterUtilities.get('user'),
  Token: GetterUtilities.get('token'),
};
const mutations = {
  SetData: MutationUtilities.set('data'),
  SetErrorMessage: MutationUtilities.set('errorMessage'),
  SetIsSignedIn: MutationUtilities.set('isSignedIn'),
  SetHasError: MutationUtilities.set('hasError'),
  SetLoading: MutationUtilities.set('loading'),
  SetUser: MutationUtilities.set('user'),
  SetToken: MutationUtilities.set('token'),
};
const state = {
  data: null,
  errorMessage: null,
  isSignedIn: false,
  hasError: false,
  loading: false,
  user: null,
  token: null,
};
export default {
  actions,
  getters,
  mutations,
  state,
};
