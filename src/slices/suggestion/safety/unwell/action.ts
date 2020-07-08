import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion } from 'types/suggestion';
import { startLoading, stopLoading } from 'slices/safety/safetySlice';
import {
  fetchUnwellHappens,
  fetchUnwellNotHappens
} from 'slices/suggestion/suggestionSlice';
import { callSuggestionAcceptApi, callSuggestionRejectApi } from '../../action';
import { Unwell } from 'types/safety';
import {
  fetchUnwellList,
  fetchUnwellNotList
} from 'slices/safety/unwell/action';

//** ASYNC FUNCS */

export const fetchSuggestedUnwellHappen = (): AppThunk => async dispatch => {
  try {
    const suggestedItems = await callSuggestionReadUnwellHappenApi();

    const unwellHappens: Unwell[] = [];
    suggestedItems.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const unwell: Unwell = {
          UnwellId: suggestion.SuggestionId,
          Name: suggestion.GroupName,
          Description: suggestion.Name,
          SafetyPlanId: '',
          NetworkContactIdResponsible: '',
          SuggestionId: suggestion.SuggestionId,
          SuggestedByUserId: suggestion.SuggestedByUserId
        };
        unwellHappens.push(unwell);
      }
    });

    dispatch(fetchUnwellHappens({ unwellHappens }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchSuggestedUnwellNotHappen = (): AppThunk => async dispatch => {
  try {
    const suggestedItems = await callSuggestionReadUnwellNotHappenApi();

    const unwellNotHappens: Unwell[] = [];
    suggestedItems.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const unwell: Unwell = {
          UnwellId: suggestion.SuggestionId,
          Name: suggestion.GroupName,
          Description: suggestion.Name,
          SafetyPlanId: '',
          NetworkContactIdResponsible: '',
          SuggestionId: suggestion.SuggestionId,
          SuggestedByUserId: suggestion.SuggestedByUserId
        };
        unwellNotHappens.push(unwell);
      }
    });

    dispatch(fetchUnwellNotHappens({ unwellNotHappens }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptUnwellSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);
    await dispatch(fetchSuggestedUnwellHappen());
    await dispatch(fetchSuggestedUnwellNotHappen());

    dispatch(fetchUnwellList());
    dispatch(fetchUnwellNotList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectUnwellSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);
    await dispatch(fetchSuggestedUnwellHappen());
    await dispatch(fetchSuggestedUnwellNotHappen());

    dispatch(fetchUnwellList());
    dispatch(fetchUnwellNotList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callSuggestionReadUnwellHappenApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/UnwellHappen').then(response => {
    const suggestions: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return suggestions;
  });
};

const callSuggestionReadUnwellNotHappenApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/UnwellNotHappen').then(response => {
    const suggestions: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return suggestions;
  });
};
