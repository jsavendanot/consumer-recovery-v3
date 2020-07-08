import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import { startLoading, stopLoading } from '../../networkSlice';
import { Network } from 'types/network';
import { Step, StepShareNetwork } from 'types/goal';
import { calllGoalStepShareCreateApi } from 'slices/goal/share/action';
import { stopStepShare, shareStep } from 'slices/goal/share/shareSlice';

export const stopShareSteps = (
  steps: Step[],
  network: Network
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const updatedStepShares: StepShareNetwork[] = [];
    for (const step of steps) {
      await callGoalStepShareDeleteApi(step.Id, network.Id);
      const updatedShare: StepShareNetwork = {
        StepId: step.Id,
        StepName: step.Name,
        SharedWithNetworkContactId: '',
        SharedWithNetworkName: '',
        SharedOnDate: ''
      };
      updatedStepShares.push(updatedShare);
    }
    await dispatch(stopStepShare({ stepShares: updatedStepShares }));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

const callGoalStepShareDeleteApi = (stepId: string, networkId: string) => {
  return axios.delete(`/GoalStepShare/Delete/${stepId}/${networkId}`);
};

export const startShareSteps = (
  steps: Step[],
  network: Network
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const updatedStepShares: StepShareNetwork[] = [];
    for (const step of steps) {
      await calllGoalStepShareCreateApi(step.Id, network);
      const updatedShare: StepShareNetwork = {
        StepId: step.Id,
        StepName: step.Name,
        SharedWithNetworkContactId: network.Id,
        SharedWithNetworkName: network.Name,
        SharedOnDate: new Date().toDateString()
      };
      updatedStepShares.push(updatedShare);
    }
    await dispatch(shareStep({ stepShares: updatedStepShares }));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};
