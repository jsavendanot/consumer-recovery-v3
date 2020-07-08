import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';

//** ASYNC FUNCS */

//** API FUNCS */

export const callSuggestionAcceptApi = (suggestionId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post(`/Suggestion/Accept/${suggestionId}`);
};

export const callSuggestionRejectApi = (suggestionId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post(`/Suggestion/Reject/${suggestionId}`);
};
