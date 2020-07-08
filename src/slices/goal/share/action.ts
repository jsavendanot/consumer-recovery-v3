import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import moment from 'moment';
import { readSteps, readGoals } from './shareSlice';
import { StepShareNetwork, GoalShareNetwork } from 'types/goal';
import { ShareNetworkApi, Network } from 'types/network';

//** ASYNC FUNCS */;
export const fetchStepsSharedNetworks = (): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    let totalStepsShare: StepShareNetwork[] = [];
    for (const step of getState().goalRoot.goalStep.steps) {
      const networks = await callGoalStepShareListApi(step.Id);
      networks.forEach(item => {
        const stepShares: StepShareNetwork = {
          StepId: step.Id,
          StepName: step.Name,
          SharedWithNetworkContactId: item.SharedWithNetworkContactId,
          SharedWithNetworkName: item.SharedWithNetworkName,
          SharedOnDate: item.SharedOnDate
        };
        totalStepsShare.push(stepShares);
      });
    }
    dispatch(readSteps({ stepsShare: totalStepsShare }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchGoalsSharedNetworks = (): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    let totalGoalsShare: GoalShareNetwork[] = [];
    for (const goal of getState().goalRoot.goal.goals) {
      const networks = await callGoalShareListApi(goal.Id);
      networks.forEach(item => {
        const goalShares: GoalShareNetwork = {
          GoalId: goal.Id,
          GoalName: goal.Name,
          SharedWithNetworkContactId: item.SharedWithNetworkContactId,
          SharedWithNetworkName: item.SharedWithNetworkName,
          SharedOnDate: item.SharedOnDate
        };
        totalGoalsShare.push(goalShares);
      });
    }
    dispatch(readGoals({ goalsShare: totalGoalsShare }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */
export const callGoalShareCreateApi = (goalId: string, network: Network) => {
  const requestContent = {
    SharedWithNetworkContactId: network.Id,
    SharedWithNetworkName: network.Name,
    SharedOnDate: moment().format('YYYY-MMM-DD')
  };
  return axios.post(`/GoalShare/Create/${goalId}`, requestContent);
};

export const calllGoalStepShareCreateApi = (
  stepId: string,
  network: Network
) => {
  const requestContent = {
    SharedWithNetworkContactId: network.Id,
    SharedWithNetworkName: network.Name,
    SharedOnDate: moment().format('YYYY-MMM-DD')
  };
  return axios.post(`/GoalStepShare/Create/${stepId}`, requestContent);
};

const callGoalStepShareListApi = (stepId: string) => {
  return axios.get(`/GoalStepShare/List/${stepId}`).then(response => {
    const networks: ShareNetworkApi[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return networks;
  });
};

export const callGoalShareListApi = (goalId: string) => {
  return axios.get(`/GoalShare/List/${goalId}`).then(response => {
    const networks: ShareNetworkApi[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return networks;
  });
};
