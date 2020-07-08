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
import uuid from 'uuid';

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

const EditGoal: React.FC<Props> = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const goalState: Goal = useSelector(
    (state: RootState) =>
      state.goalRoot.goal.goals.find(item => item.Id === id)!
  );

  const stepsState: Step[] = useSelector(
    (state: RootState) =>
      state.goalRoot.goalStep.steps.filter(item => item.GoalId === id)!
  );

  const stepsShareState: StepShareNetwork[] = useSelector(
    (state: RootState) =>
      state.goalRoot.goalShare.stepsShare.filter(item =>
        stepsState.find(step => step.Id === item.StepId)
      )!
  );

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  /** Confirmation flag */
  const [confirm, setConfirm] = useState(false);

  const steps = [
    ...stepsState.map(step => {
      return {
        id: step?.Id ? step?.Id : '',
        name: step?.Name ? step?.Name : '',
        repeat: {
          switch: step?.IsDeadline === true ? false : true,
          number: step?.RepeatTimes ? step?.RepeatTimes : 0,
          type: step?.RepeatUnit ? step?.RepeatUnit : '',
          frequencyNumber: 0,
          frequencyType: step?.RepeatFrequency ? step?.RepeatFrequency : 'day',
          targetNumber: step?.RepeatTotalTimes ? step?.RepeatTotalTimes : 0
        },
        dateTime: {
          switch: step?.IsDeadline ? step?.IsDeadline : false,
          reminder: step?.IsDeadline ? step?.IsDeadline : false,
          reminderDate: step?.EndDate ? step?.EndDate : moment().toString()
        },
        share: {
          whoCanSee: step?.VisibleTo ? step?.VisibleTo : 'Network',
          network: [
            ...stepsShareState
              .filter(item => item.StepId === step.Id)
              .map(share => {
                return networks.find(
                  network => network.Id === share.SharedWithNetworkContactId
                )!;
              })
          ]
        }
      };
    })
  ];

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
    steps: steps,
    focusAreaId: goalState.FocusArea,
    completedDate: goalState.CompletedDate,
    percentageComplete: goalState.PercentageComplete,
    image: goalState.Image,
    imageType: goalState.ImageType
  });

  /** Step */
  const [step, setStep] = useState<StepForm>({
    id: uuid(),
    name: '',
    repeat: {
      switch: false,
      number: 3,
      type: 'times',
      frequencyNumber: 1,
      frequencyType: 'week',
      targetNumber: 3
    },
    dateTime: {
      switch: true,
      reminder: true,
      reminderDate: moment(new Date().toString()).toString()
    },
    share: {
      whoCanSee: 'Network',
      network: []
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

export default EditGoal;
