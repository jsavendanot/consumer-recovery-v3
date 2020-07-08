import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion } from 'types/suggestion';
import { startLoading, stopLoading } from 'slices/safety/safetySlice';
import { fetchPeople, fetchOrgs } from 'slices/suggestion/suggestionSlice';
import { callSuggestionAcceptApi, callSuggestionRejectApi } from '../../action';
import { Network } from 'types/network';
import { fetchEmergencyContacts } from 'slices/safety/support/action';

//** ASYNC FUNCS */

export const fetchSuggestedUnwellNotice = (): AppThunk => async dispatch => {
  try {
    const suggestedItems = await callSuggestionReadUnwellNoticeApi();

    const people: Network[] = [];
    const services: Network[] = [];
    suggestedItems.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const infoArray = suggestion.ExtraInfo.split(',');
        if (infoArray.length === 3) {
          const network: Network = {
            Id: '',
            UserId: '',
            ContactId: '',
            Name: infoArray[0],
            Email: '',
            Phone: infoArray[1],
            CallForSupport: true,
            Address: '',
            Type: infoArray[2] === 'person' ? 'Person' : 'Organisation',
            Relationship: '',
            Image: '',
            ImageType: '',
            ImageUrl: '',
            SuggestionId: suggestion.SuggestionId,
            SuggestedByUserId: suggestion.SuggestedByUserId
          };
          if (network.Type === 'Person') {
            people.push(network);
          } else {
            services.push(network);
          }
        }
      }
    });

    dispatch(fetchPeople({ people }));
    dispatch(fetchOrgs({ organisations: services }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptUnwellNoticeSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);

    await dispatch(fetchSuggestedUnwellNotice());
    await dispatch(fetchEmergencyContacts());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectUnwellNoticeSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);

    await dispatch(fetchSuggestedUnwellNotice());
    await dispatch(fetchEmergencyContacts());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callSuggestionReadUnwellNoticeApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/WhenUnwellNotice').then(response => {
    const suggestions: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return suggestions;
  });
};
