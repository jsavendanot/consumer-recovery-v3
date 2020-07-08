import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import moment from 'moment';
import {
  read,
  remove,
  progress,
  startLoading,
  stopLoading,
  update
} from './goalSlice';
import { GoalForm, GoalCompletion, Goal, Step, GoalHelp } from 'types/goal';
import {
  fetchStepsSharedNetworks,
  fetchGoalsSharedNetworks
} from './share/action';
import { fetchGoalsComments } from './comment/action';
import {
  callGoalStepCreateApi,
  fetchStepsData,
  callGoalStepDeleteApi
} from './step/action';
import { fetchAllFocusAreas } from 'slices/other/action';
import { fetchSuggestedGoals } from 'slices/suggestion/goal/action';
import { Network } from 'types/network';

//** ASYNC FUNCS */
export const fetchGoals = (): AppThunk => async (dispatch, getState) => {
  try {
    const goalLen = getState().goalRoot.goal.goals.length;

    goalLen === 0 && dispatch(startLoading());
    await dispatch(fetchAllFocusAreas());

    const goals = await callGoalListApi();
    dispatch(read({ goals }));

    dispatch(fetchSuggestedGoals());
    dispatch(fetchGoalCompletion());

    dispatch(fetchStepsData(goals));

    goalLen === 0 && dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchGoalDetails = (
  goalId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await dispatch(fetchGoalsComments(goalId));
    await dispatch(fetchStepsSharedNetworks());
    await dispatch(fetchGoalsSharedNetworks());

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchGoalCompletion = (): AppThunk => async dispatch => {
  try {
    const goalsCompletion = await callGoalRateSinceSignUpApi();
    dispatch(progress({ goalsCompletion }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const removeGoal = (goalId: string): AppThunk => async dispatch => {
  try {
    await callGoalDeleteApi(goalId);
    dispatch(remove({ goalId }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const createGoal = (history: any, goal: GoalForm): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startLoading());

    const allNetworks = getState().networkRoot.network.networks;
    await callGoalCreateApi(goal, allNetworks);
    dispatch(stopLoading());
    history.push('/goals/current');
    // dispatch(addNew({ goal }));
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const updateGoalProgress = (
  goal: Goal,
  completionPercent: number,
  completedDate: string
): AppThunk => async dispatch => {
  try {
    const updatedGoal: Goal = {
      Id: goal.Id,
      Name: goal.Name,
      Description: goal.Description,
      IsDeadline: goal.IsDeadline,
      StartDate: goal.StartDate,
      EndDate: goal.EndDate,
      PercentageComplete: completionPercent,
      Image: goal.Image,
      ImageType: goal.ImageType,
      CompletedDate: completedDate,
      VisibleTo: goal.VisibleTo,
      FocusArea: goal.FocusArea,
      UserId: goal.UserId
    };

    await callGoalUpdateApi(updatedGoal);
    dispatch(update({ updatedGoal }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const editGoalAndStep = (
  history: any,
  goal: GoalForm
): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startLoading());
    const oldSteps = getState().goalRoot.goalStep.steps.filter(
      item => item.GoalId === goal.id
    );

    const allNetworks = getState().networkRoot.network.networks;
    await editGoal(goal, oldSteps, allNetworks);

    dispatch(stopLoading());
    history.push('/goals/current');
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const sendHelpRequest = (
  history: any,
  help: GoalHelp
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callGoalHelpApi(help);
    dispatch(stopLoading());
    history.goBack();
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
const editGoal = async (
  goal: GoalForm,
  oldSteps: Step[],
  allNetworks: Network[]
) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  let numberOfSpecificSteps = 0;
  let numberOfPrivateSteps = 0;
  let numberOfPrublicSteps = 0;

  goal.steps.forEach(step => {
    if (step.share.whoCanSee === 'SpecificPeople') {
      numberOfSpecificSteps++;
    }
    if (step.share.whoCanSee === 'OnlyMe') {
      numberOfPrivateSteps++;
    }
    if (step.share.whoCanSee === 'Network') {
      numberOfPrublicSteps++;
    }
  });

  let whoCanSee: 'Network' | 'OnlyMe' | 'SpecificPeople' = 'Network';
  if (numberOfSpecificSteps > 0) {
    whoCanSee = 'SpecificPeople';
  } else if (numberOfPrublicSteps > 0) {
    whoCanSee = 'Network';
  } else if (
    numberOfSpecificSteps === 0 &&
    numberOfPrublicSteps === 0 &&
    numberOfPrivateSteps > 0
  ) {
    whoCanSee = 'OnlyMe';
  }

  const requestContent: Goal = {
    Id: goal.id,
    Name: goal.name,
    Description: goal.desc,
    IsDeadline: goal.deadline.switch,
    StartDate: moment(goal.deadline.startDate).format('YYYY-MMM-DD'),
    EndDate: moment(goal.deadline.endDate).format('YYYY-MMM-DD'),
    PercentageComplete: goal.percentageComplete,
    CompletedDate:
      goal.completedDate !== ''
        ? moment(goal.completedDate).format('YYYY-MMM-DD')
        : '',
    Image: goal.image,
    ImageType: goal.imageType,
    FocusArea: goal.focusAreaId,
    VisibleTo: whoCanSee === 'OnlyMe' ? 'OnlyMe' : 'SpecificPeople',
    UserId: sessionStorage.getItem('UserId')!
  };

  await callGoalUpdateApi(requestContent).then(async response => {
    await Promise.all(
      goal.steps
        .filter(item => !oldSteps.find(step => step.Id === item.id))
        .map(async step => {
          await callGoalStepCreateApi(step, allNetworks, goal.id);
        })
    );

    await Promise.all(
      oldSteps
        .filter(step => !goal.steps.find(item => item.id === step.Id))
        .map(async step => {
          await callGoalStepDeleteApi(step.Id);
        })
    );
  });
};

const callGoalCreateApi = (goal: GoalForm, allNetworks: Network[]) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  let numberOfSpecificSteps = 0;
  let numberOfPrivateSteps = 0;
  let numberOfPrublicSteps = 0;

  goal.steps.forEach(step => {
    if (step.share.whoCanSee === 'SpecificPeople') {
      numberOfSpecificSteps++;
    }
    if (step.share.whoCanSee === 'OnlyMe') {
      numberOfPrivateSteps++;
    }
    if (step.share.whoCanSee === 'Network') {
      numberOfPrublicSteps++;
    }
  });

  let whoCanSee = 'Network';
  if (numberOfSpecificSteps > 0) {
    whoCanSee = 'SpecificPeople';
  } else if (numberOfPrublicSteps > 0) {
    whoCanSee = 'Network';
  } else if (
    numberOfSpecificSteps === 0 &&
    numberOfPrublicSteps === 0 &&
    numberOfPrivateSteps > 0
  ) {
    whoCanSee = 'OnlyMe';
  }

  const requestContent = {
    Id: goal.id,
    Name: goal.name,
    Description: goal.desc,
    IsDeadline: goal.deadline.switch,
    StartDate: moment(goal.deadline.startDate).format('YYYY-MMM-DD'),
    EndDate: moment(goal.deadline.endDate).format('YYYY-MMM-DD'),
    PercentageComplete: 0,
    CompletedDate: goal.completedDate,
    FocusArea: goal.focusAreaId,
    Image: goal.image,
    VisibleTo: whoCanSee === 'OnlyMe' ? 'OnlyMe' : 'SpecificPeople'
  };
  return axios.post('/Goal/Create', requestContent).then(async response => {
    await Promise.all(
      goal.steps.map(async step => {
        await callGoalStepCreateApi(step, allNetworks, response.data);
      })
    );
  });
};

export const callGoalUpdateApi = (goal: Goal) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/Goal/Update', goal);
};

export const callGoalListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Goal/List').then(async response => {
    const goals: Goal[] = JSON.parse(JSON.stringify(response.data));
    return goals;
  });
};

export const callGoalRateSinceSignUpApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.get('/Goal/GoalRateSinceSignUp').then(async response => {
    const goalsCompletion: GoalCompletion[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return goalsCompletion;
  });
};

const callGoalDeleteApi = (goalId: string) => {
  return axios.delete(`/Goal/Delete/${goalId}`);
};

export const callGoalHelpApi = (help: GoalHelp) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios.post('/Goal/Help', help);
};
