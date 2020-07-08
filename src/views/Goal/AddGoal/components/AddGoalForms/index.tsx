import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v1';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetworks } from 'slices/network/action';
import GoalContext, { ContextProps } from './GoalContext';
import { GoalForm, StepForm } from 'types/goal';

import { Hidden } from '@material-ui/core';

import { LargeScreens, SmallScreens } from './components';
import { RootState } from 'reducer';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { FocusArea } from 'types/other';

interface MatchParams {
  areaId: string;
}
type Props = RouteComponentProps<MatchParams>;

const AddGoalForms: React.FC<Props> = ({ match, history }) => {
  const { areaId } = match.params;
  const dispatch = useDispatch();

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [focusArea] = useState<FocusArea>(
    focusAreas.find(area => area.id === areaId)!
  );

  /** Confirmation flag */
  const [confirm, setConfirm] = useState(false);

  /** Goal state  */
  const [goal, setGoal] = useState<GoalForm>({
    id: uuid(),
    name: '',
    desc: '',
    deadline: {
      switch: true,
      startDate: moment(new Date().toString()).toString(),
      endDate: moment(new Date().toString())
        .add(1, 'day')
        .toString()
    },
    steps: [],
    focusAreaId: '',
    completedDate: '',
    percentageComplete: 0,
    image: '',
    imageType: ''
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
    areaId,
    goal,
    setGoal,
    step,
    setStep,
    confirm,
    setConfirm
  };

  const networksLen: number = useSelector(
    (state: RootState) => state.networkRoot.network.networks.length
  );

  useEffect(() => {
    if (networksLen === 0) {
      dispatch(fetchNetworks());
    }
  }, [dispatch, networksLen]);

  return focusArea ? (
    <GoalContext.Provider value={goalProps}>
      <Hidden lgUp>
        <SmallScreens />
      </Hidden>
      <Hidden mdDown>
        <LargeScreens />
      </Hidden>
    </GoalContext.Provider>
  ) : (
    <Redirect to="/create/goal" />
  );
};

export default AddGoalForms;
