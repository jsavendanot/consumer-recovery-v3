import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import { Network } from 'types/network';
import { Goal, GoalShareNetwork } from 'types/goal';
import { callGoalShareCreateApi } from 'slices/goal/share/action';
import { shareGoal, stopGoalShare } from 'slices/goal/share/shareSlice';
import { callGoalListApi } from 'slices/goal/action';

export const startSharingGoals = (
  goals: Goal[],
  network: Network
): AppThunk => async dispatch => {
  try {
    const updatedGoalShares: GoalShareNetwork[] = [];
    for (const goal of goals) {
      await callGoalShareCreateApi(goal.Id, network);
      const updatedShare: GoalShareNetwork = {
        GoalId: goal.Id,
        GoalName: goal.Name,
        SharedWithNetworkContactId: network.Id,
        SharedWithNetworkName: network.Name,
        SharedOnDate: new Date().toDateString()
      };
      updatedGoalShares.push(updatedShare);
    }
    await dispatch(shareGoal({ goalShares: updatedGoalShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const stopSharingGoals = (
  goals: Goal[],
  network: Network
): AppThunk => async dispatch => {
  try {
    const updatedGoalShares: GoalShareNetwork[] = [];
    for (const goal of goals) {
      await callGoalShareDeleteApi(goal.Id, network.Id);
      const updatedShare: GoalShareNetwork = {
        GoalId: goal.Id,
        GoalName: goal.Name,
        SharedWithNetworkContactId: '',
        SharedWithNetworkName: '',
        SharedOnDate: ''
      };
      updatedGoalShares.push(updatedShare);
    }
    await dispatch(stopGoalShare({ goalShares: updatedGoalShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const stopAllGoalsSharing = (
  network: Network
): AppThunk => async dispatch => {
  try {
    const allGoals = await callGoalListApi();
    const updatedGoalShares: GoalShareNetwork[] = [];

    for (const goal of allGoals) {
      await callGoalShareDeleteApi(goal.Id, network.Id);
      const updatedShare: GoalShareNetwork = {
        GoalId: goal.Id,
        GoalName: goal.Name,
        SharedWithNetworkContactId: '',
        SharedWithNetworkName: '',
        SharedOnDate: ''
      };
      updatedGoalShares.push(updatedShare);
    }
    await dispatch(stopGoalShare({ goalShares: updatedGoalShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const startSharingAllGoals = (
  network: Network
): AppThunk => async dispatch => {
  try {
    const allGoals = await callGoalListApi();
    const updatedGoalShares: GoalShareNetwork[] = [];

    for (const goal of allGoals) {
      await callGoalShareCreateApi(goal.Id, network);
      const updatedShare: GoalShareNetwork = {
        GoalId: goal.Id,
        GoalName: goal.Name,
        SharedWithNetworkContactId: network.Id,
        SharedWithNetworkName: network.Name,
        SharedOnDate: new Date().toDateString()
      };
      updatedGoalShares.push(updatedShare);
    }
    await dispatch(shareGoal({ goalShares: updatedGoalShares }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const callGoalShareDeleteApi = (goalId: string, networkId: string) => {
  return axios.delete(`/GoalShare/Delete/${goalId}/${networkId}`);
};
