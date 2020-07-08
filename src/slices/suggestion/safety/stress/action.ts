import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion } from 'types/suggestion';
import { startLoading, stopLoading } from 'slices/safety/safetySlice';
import { fetchStressMe } from 'slices/suggestion/suggestionSlice';
import { callSuggestionAcceptApi, callSuggestionRejectApi } from '../../action';
import { Item } from 'types/safety';
import { fetchStressList } from 'slices/safety/stress/action';

//** ASYNC FUNCS */

export const fetchSuggestedStressMe = (): AppThunk => async dispatch => {
  try {
    const suggestedItems = await callSuggestionReadStressMeApi();

    const items: Item[] = [];
    suggestedItems.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const item: Item = {
          id: suggestion.SuggestionId,
          name: suggestion.Name,
          SuggestionId: suggestion.SuggestionId,
          SuggestedByUserId: suggestion.SuggestedByUserId
        };
        items.push(item);
      }
    });

    dispatch(fetchStressMe({ items }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptStressMeSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);

    await dispatch(fetchSuggestedStressMe());
    dispatch(fetchStressList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectStressMeSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);

    await dispatch(fetchSuggestedStressMe());
    dispatch(fetchStressList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callSuggestionReadStressMeApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/StressMe').then(response => {
    const suggestions: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return suggestions;
  });
};
