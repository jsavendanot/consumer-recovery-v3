import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import moment from 'moment';
import uuid from 'uuid';
import { read, update } from './stepSlice';
import { StepForm, ProgressCheckIn, Step, Goal } from 'types/goal';
import { startLoading, stopLoading } from '../goalSlice';
import {
  callGoalShareCreateApi,
  calllGoalStepShareCreateApi
} from '../share/action';
import { fetchGoalCompletion, updateGoalProgress } from '../action';
import { Network } from 'types/network';

//** ASYNC FUNCS */
export const fetchStepsData = (goals: Goal[]): AppThunk => async dispatch => {
  try {
    //fetch steps
    let totalSteps: Step[] = [];
    for (const goal of goals) {
      const steps = await callGoalStepListApi(
        goal.Id,
        sessionStorage.getItem('UserId')!
      );
      totalSteps = totalSteps.concat(steps);
    }
    dispatch(read({ steps: totalSteps }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const checkInStep = (
  goal: Goal,
  stepId: string,
  stepName: string,
  IsCompleted: boolean
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    await callProgressCheckInCreateApi(stepId, stepName, IsCompleted);

    await dispatch(fetchGoalCompletion());

    const completionPercent = getState().goalRoot.goal.completionRate.find(
      item => item.GoalId === goal.Id
    )!?.PercentageCompletion;

    const completedDate =
      completionPercent === 1
        ? moment()
            .toDate()
            .toDateString()
        : '';

    dispatch(updateGoalProgress(goal, completionPercent, completedDate));

    //update steps
    const updatedSteps = await callGoalStepListApi(
      goal.Id,
      sessionStorage.getItem('UserId')!
    );

    dispatch(update({ updatedSteps }));
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const updateStep = (
  history: any,
  step: StepForm,
  goalId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callGoalStepUpdateApi(step, goalId);

    dispatch(stopLoading());
    history.push('/goals/current');
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callGoalStepCreateApi = (
  step: StepForm,
  allNetworks: Network[],
  goalId: string
) => {
  const requestContent = {
    Id: step.id,
    GoalId: goalId,
    Name: step.name,
    RepeatTimes: step.dateTime.switch ? 1 : step.repeat.number,
    RepeatUnit: step.repeat.type,
    RepeatFrequency: step.repeat.frequencyType,
    RepeatTotalTimes: step.dateTime.switch ? 1 : step.repeat.targetNumber,
    IsDeadline: step.dateTime.switch,
    StartDate: moment(step.dateTime.reminderDate).format('YYYY-MMM-DD'),
    EndDate: moment(step.dateTime.reminderDate).format('YYYY-MMM-DD'),
    VisibleTo: step.share.whoCanSee
  };

  return axios.post('/GoalStep/Create', requestContent).then(async response => {
    if (step.share.whoCanSee === 'SpecificPeople') {
      await Promise.all(
        step.share.network.map(async item => {
          await callGoalShareCreateApi(goalId, item);
          await calllGoalStepShareCreateApi(response.data, item);
        })
      );
    } else if (step.share.whoCanSee === 'Network') {
      await Promise.all(
        allNetworks.map(async item => {
          await callGoalShareCreateApi(goalId, item);
          await calllGoalStepShareCreateApi(response.data, item);
        })
      );
    }
  });
};

export const callGoalStepListApi = (goalId: string, userId: string) => {
  const steps: Step[] = [];
  const url = `/GoalStep/List/${goalId}/${userId}`;
  return axios.get(url).then(async response => {
    const responseData: Step[] = JSON.parse(JSON.stringify(response.data));

    for (const value of responseData) {
      let IsCompleted = false;
      let visitsLeft = 0;

      const progressCheckIn = await callProgressCheckInListApi(value.Id);
      IsCompleted =
        progressCheckIn.filter(item => item.IsCompleted).length ===
        value.RepeatTotalTimes;

      visitsLeft =
        value.RepeatTotalTimes -
        progressCheckIn.filter(item => item.IsCompleted).length;

      const step: Step = {
        Id: value.Id,
        GoalId: value.GoalId,
        Name: value.Name,
        RepeatTimes: value.RepeatTimes,
        RepeatUnit: value.RepeatUnit,
        RepeatFrequency: value.RepeatFrequency,
        RepeatTotalTimes: value.RepeatTotalTimes,
        IsDeadline: value.IsDeadline,
        StartDate: value.StartDate,
        EndDate: value.EndDate,
        VisibleTo: value.VisibleTo,
        IsCompleted: IsCompleted,
        visitsLeft: visitsLeft
      };

      steps.push(step);
    }
    return steps;
  });
};

const callProgressCheckInCreateApi = (
  stepId: string,
  stepName: string,
  IsCompleted: boolean
) => {
  const requestContent = {
    Id: uuid(),
    GoalStepId: stepId,
    IsCompleted: IsCompleted,
    Name: stepName
  };
  return axios.post('/ProgressCheckIn/Create', requestContent);
};

const callProgressCheckInListApi = (stepId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.get(`/ProgressCheckIn/List/${stepId}`).then(async response => {
    const progressCheckIn: ProgressCheckIn[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return progressCheckIn;
  });
};

export const callGoalStepDeleteApi = (stepId: string) => {
  return axios.delete(`/GoalStep/Delete/${stepId}`);
};

const callGoalStepUpdateApi = (step: StepForm, goalId: string) => {
  const requestContent = {
    Id: step.id,
    GoalId: goalId,
    Name: step.name,
    RepeatTimes: step.repeat.number,
    RepeatUnit: step.repeat.type,
    RepeatFrequency: step.repeat.frequencyType,
    RepeatFrequencyFactor: step.repeat.frequencyNumber,
    RepeatTotalTimes: step.repeat.targetNumber,
    VisibleTo: step.share.whoCanSee,
    IsDeadline: step.dateTime.switch,
    IsReminderOn: step.dateTime.reminder,
    ReminderSentOn: step.dateTime.reminderDate,
    StartDate: moment(step.dateTime.reminderDate).format('YYYY-MMM-DD'),
    EndDate: moment(step.dateTime.reminderDate).format('YYYY-MMM-DD')
  };
  return axios.post(`/GoalStep/Update/${step.id}`, requestContent);
};
