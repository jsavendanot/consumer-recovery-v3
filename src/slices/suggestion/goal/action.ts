import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { Suggestion, GoalInfo, StepInfo } from 'types/suggestion';
import { Goal, Step } from 'types/goal';
import uuid from 'uuid';
import { startLoading, stopLoading } from 'slices/goal/goalSlice';
import { fetchGoals as readGoals } from 'slices/goal/action';
import { fetchGoals, fetchSteps } from 'slices/suggestion/suggestionSlice';
import { callSuggestionAcceptApi, callSuggestionRejectApi } from '../action';

//** ASYNC FUNCS */

export const fetchSuggestedGoals = (): AppThunk => async dispatch => {
  try {
    const suggestedGoals = await callSuggestionReadGoalsApi().then(response => {
      const suggestionList: Suggestion[] = [];
      [...response.data].forEach(item => {
        if (item['RejectedOn'] === null && item['AcceptedOn'] === null) {
          const steps: StepInfo[] = JSON.parse(
            JSON.stringify(item['GoalInfo']['Steps'])
          );

          const goalInfo: GoalInfo = {
            Name: item['GoalInfo']['Name'],
            Description: item['GoalInfo']['Description'],
            IsDeadline: item['GoalInfo']['IsDeadline'],
            StartDate: item['GoalInfo']['StartDate'],
            EndDate: item['GoalInfo']['EndDate'],
            Image: item['GoalInfo']['Image'],
            ImageType: item['GoalInfo']['ImageType'],
            VisibleTo: item['GoalInfo']['VisibleTo'],
            FocusArea: item['GoalInfo']['FocusArea'],
            Steps: steps
          };

          const suggestion: Suggestion = {
            SuggestionId: item['SuggestionId'],
            RecoveryPlanId: item['RecoveryPlanId'],
            SuggestedByUserId: item['SuggestedByUserId'],
            Name: item['Name'],
            ExtraInfo: item['ExtraInfo'],
            GroupName: item['GroupName'],
            GoalInfo: goalInfo,
            AcceptedOn: item['AcceptedOn'],
            RejectedOn: item['RejectedOn']
          };

          suggestionList.push(suggestion);
        }
      });

      return suggestionList;
    });

    const goals: Goal[] = [];
    const steps: Step[] = [];
    for (const suggestion of suggestedGoals) {
      const goalId = uuid();
      const goal: Goal = {
        Id: goalId,
        Name: suggestion.GoalInfo.Name,
        Description: suggestion.GoalInfo.Description,
        IsDeadline: suggestion.GoalInfo.IsDeadline,
        StartDate: suggestion.GoalInfo.StartDate,
        EndDate: suggestion.GoalInfo.EndDate,
        PercentageComplete: 0,
        CompletedDate: '',
        Image: suggestion.GoalInfo.Image,
        ImageType: suggestion.GoalInfo.ImageType,
        VisibleTo: suggestion.GoalInfo.VisibleTo,
        FocusArea: suggestion.GoalInfo.FocusArea,
        UserId: '',
        SuggestionId: suggestion.SuggestionId,
        SuggestedByUserId: suggestion.SuggestedByUserId
      };
      goals.push(goal);

      suggestion.GoalInfo.Steps.forEach(item => {
        const step: Step = {
          Id: uuid(),
          GoalId: goalId,
          Name: item.Name,
          RepeatTimes: item.RepeatTimes,
          RepeatUnit: item.RepeatUnit,
          RepeatFrequency: item.RepeatFrequency,
          RepeatTotalTimes: item.RepeatTotalTimes,
          VisibleTo: item.VisibleTo,
          IsDeadline: item.IsDeadline,
          StartDate: item.StartDate,
          EndDate: item.EndDate,
          IsCompleted: false,
          visitsLeft: 0
        };
        steps.push(step);
      });
    }

    dispatch(fetchGoals({ goals }));
    dispatch(fetchSteps({ steps }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const acceptGoalSuggestion = (
  history: any,
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionAcceptApi(suggestionId);
    dispatch(readGoals());
    history.push('/goals/current');
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const rejectGoalSuggestion = (
  history: any,
  suggestionId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callSuggestionRejectApi(suggestionId);
    dispatch(readGoals());
    history.push('/goals/current');
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const callSuggestionReadGoalsApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Suggestion/Read/Goals');
};
