import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion } from 'types/suggestion';
import { startLoading, stopLoading } from 'slices/safety/safetySlice';
import {
  fetchDifficulties,
  fetchStrategies
} from 'slices/suggestion/suggestionSlice';
import { callSuggestionAcceptApi, callSuggestionRejectApi } from '../../action';
import { Item } from 'types/safety';
import {
  fetchWarnDiffList,
  fetchWarnStrList
} from 'slices/safety/warning/action';

//** ASYNC FUNCS */

export const fetchSuggestedWarningSigns = (): AppThunk => async dispatch => {
  try {
    const suggestedDifficultyItems = await callSuggestionReadDifficiltiesApi();
    const suggestedStrategyItems = await callSuggestionReadStrategiesApi();

    const difficulties: Item[] = [];
    const strategies: Item[] = [];
    suggestedDifficultyItems.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const item: Item = {
          id: suggestion.SuggestionId,
          name: suggestion.Name,
          SuggestionId: suggestion.SuggestionId,
          SuggestedByUserId: suggestion.SuggestedByUserId
        };
        difficulties.push(item);
      }
    });

    suggestedStrategyItems.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const item: Item = {
          id: suggestion.SuggestionId,
          name: suggestion.Name,
          SuggestionId: suggestion.SuggestionId,
          SuggestedByUserId: suggestion.SuggestedByUserId
        };
        strategies.push(item);
      }
    });

    dispatch(fetchDifficulties({ items: difficulties }));
    dispatch(fetchStrategies({ items: strategies }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptWarningSignSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);
    await dispatch(fetchSuggestedWarningSigns());

    dispatch(fetchWarnDiffList());
    dispatch(fetchWarnStrList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectWarningSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);
    await dispatch(fetchSuggestedWarningSigns());

    dispatch(fetchWarnDiffList());
    dispatch(fetchWarnStrList());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callSuggestionReadDifficiltiesApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/WarningSigns').then(response => {
    const suggestions: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return suggestions;
  });
};

const callSuggestionReadStrategiesApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/Strategies').then(response => {
    const suggestions: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return suggestions;
  });
};
