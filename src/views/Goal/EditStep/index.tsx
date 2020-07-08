import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetworks } from 'slices/network/action';
import GoalContext, { ContextProps } from './GoalContext';
import { GoalForm, StepForm, Goal, Step, StepShareNetwork } from 'types/goal';

import { Hidden } from '@material-ui/core';

import { LargeScreens, SmallScreens } from './components';
import { RootState } from 'reducer';
import { RouteComponentProps } from 'react-router-dom';
import { Network } from 'types/network';

interface MatchParams {
  id: string;
  stepId: string;
}
type Props = RouteComponentProps<MatchParams>;

const EditStep: React.FC<Props> = ({ match }) => {
  const { id, stepId } = match.params;
  const dispatch = useDispatch();

  const goalState: Goal = useSelector(
    (state: RootState) =>
      state.goalRoot.goal.goals.find(item => item.Id === id)!
  );

  const stepToEdit: Step = useSelector(
    (state: RootState) =>
      state.goalRoot.goalStep.steps
        .filter(item => item.GoalId === id)
        .find(step => step.Id === stepId)!
  );

  const stepsShareState: StepShareNetwork[] = useSelector(
    (state: RootState) =>
      state.goalRoot.goalShare.stepsShare.filter(
        item => item.StepId === stepToEdit.Id
      )!
  );

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  /** Confirmation flag */
  const [confirm, setConfirm] = useState(false);

  /** Goal state  */
  const [goal, setGoal] = useState<GoalForm>({
    id: goalState.Id,
    name: goalState.Name,
    desc: goalState.Description,
    deadline: {
      switch: goalState.IsDeadline,
      startDate: goalState.StartDate,
      endDate: goalState.EndDate
    },
    steps: [],
    focusAreaId: goalState.FocusArea,
    completedDate: goalState.CompletedDate,
    percentageComplete: goalState.PercentageComplete,
    image: goalState.Image,
    imageType: goalState.ImageType
  });

  /** Step */
  const [step, setStep] = useState<StepForm>({
    id: stepToEdit.Id,
    name: stepToEdit.Name,
    repeat: {
      switch: stepToEdit.IsDeadline ? false : true,
      number: stepToEdit.RepeatTimes,
      type: stepToEdit.RepeatUnit,
      frequencyNumber: 1,
      frequencyType: stepToEdit.RepeatFrequency,
      targetNumber: stepToEdit.RepeatTotalTimes
    },
    dateTime: {
      switch: stepToEdit.IsDeadline,
      reminder: stepToEdit.IsDeadline,
      reminderDate: moment(stepToEdit.StartDate).toString()
    },
    share: {
      whoCanSee: stepToEdit.VisibleTo as
        | 'Network'
        | 'OnlyMe'
        | 'SpecificPeople',
      network: [
        ...stepsShareState.map(share => {
          return networks.find(
            network => network.Id === share.SharedWithNetworkContactId
          )!;
        })
      ]
    }
  });

  const goalProps: ContextProps = {
    goal,
    setGoal,
    step,
    setStep,
    confirm,
    setConfirm
  };

  useEffect(() => {
    if (networks.length === 0) {
      dispatch(fetchNetworks());
    }
  }, [dispatch, networks.length]);

  return (
    <GoalContext.Provider value={goalProps}>
      <Hidden lgUp>
        <SmallScreens />
      </Hidden>
      <Hidden mdDown>
        <LargeScreens />
      </Hidden>
    </GoalContext.Provider>
  );
};

export default EditStep;
