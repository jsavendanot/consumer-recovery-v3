import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion } from 'types/suggestion';
import { startLoading, stopLoading } from 'slices/story/storySlice';
import {
  fetchStrengths,
  fetchFocusAreas
} from 'slices/suggestion/suggestionSlice';
import { callSuggestionAcceptApi, callSuggestionRejectApi } from '../action';
import { Strength } from 'types/story';
import { fetchStrenghtsData, fetchMyAreas } from 'slices/story/action';
import { FocusArea } from 'types/other';

//** ASYNC FUNCS */

export const fetchSuggestedStrengths = (): AppThunk => async dispatch => {
  try {
    const suggestedStrengths = await callSuggestionReadStrengthsApi();

    const strengths: Strength[] = [];
    suggestedStrengths.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const strength: Strength = {
          id: suggestion.SuggestionId,
          name: suggestion.Name,
          SuggestionId: suggestion.SuggestionId,
          SuggestedByUserId: suggestion.SuggestedByUserId
        };
        strengths.push(strength);
      }
    });

    dispatch(fetchStrengths({ strengths }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchSuggestedFocusAreas = (): AppThunk => async dispatch => {
  try {
    const allAreas: FocusArea[] = JSON.parse(
      sessionStorage.getItem('focusAreas')!
    );

    const suggestedAreas = await callSuggestionReadFocusAreasApi();

    const focusAreas: FocusArea[] = [];
    suggestedAreas.forEach(suggestion => {
      if (suggestion.AcceptedOn === null && suggestion.RejectedOn === null) {
        const data: FocusArea = allAreas.find(
          item => item.id === suggestion.Name
        )!;
        const focusArea: FocusArea = {
          id: data.id,
          name: data.name,
          color: data.color,
          image: data.image,
          description: data.description,
          isSelected: true,
          SuggestionId: suggestion.SuggestionId,
          SuggestedByUserId: suggestion.SuggestedByUserId
        };
        focusAreas.push(focusArea);
      }
    });

    dispatch(fetchFocusAreas({ focusAreas }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptStrengthSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);

    await dispatch(fetchSuggestedStrengths());
    dispatch(fetchStrenghtsData());
    dispatch(fetchMyAreas());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectStrengthSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);

    await dispatch(fetchSuggestedStrengths());
    dispatch(fetchStrenghtsData());
    dispatch(fetchMyAreas());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const acceptFocusAreaSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);

    await dispatch(fetchSuggestedFocusAreas());
    dispatch(fetchMyAreas());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectFocusAreaSuggestion = (
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);

    await dispatch(fetchSuggestedFocusAreas());
    dispatch(fetchMyAreas());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callSuggestionReadStrengthsApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/Strengths').then(response => {
    const strenghts: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return strenghts;
  });
};

const callSuggestionReadFocusAreasApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/FocusAreas').then(response => {
    const strenghts: Suggestion[] = JSON.parse(JSON.stringify(response.data));
    return strenghts;
  });
};
