import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion } from 'types/suggestion';
import { startLoading, stopLoading } from 'slices/safety/safetySlice';
import { fetchStayWell } from 'slices/suggestion/suggestionSlice';
import { callSuggestionAcceptApi, callSuggestionRejectApi } from '../../action';
import { Item } from 'types/safety';
import { fetchStaywellList } from 'slices/safety/staywell/action';

//** ASYNC FUNCS */

export const fetchSuggestedStayWell = (): AppThunk => async dispatch => {
  try {
    const suggestedItems = await callSuggestionReadStayWellApi();

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

    dispatch(fetchStayWell({ items }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptStayWellSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);

    await dispatch(fetchSuggestedStayWell());
    dispatch(fetchStaywellList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectStayWellSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);

    await dispatch(fetchSuggestedStayWell());
    dispatch(fetchStaywellList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callSuggestionReadStayWellApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/StayWell').then(response => {
    const suggestions: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return suggestions;
  });
};
