import React, { useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { Step, Goal } from 'types/goal';

import { Hidden } from '@material-ui/core';

import DetailSmall from './DetailSmall';
import DetailLarge from './DetailLarge';
import { fetchGoalDetails } from 'slices/goal/action';

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

const GoalDetails: React.FC<Props> = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const goal: Goal = useSelector(
    (state: RootState) =>
      state.goalRoot.goal.goals.find(item => item.Id === id)!
  );
  const steps: Step[] = useSelector((state: RootState) =>
    state.goalRoot.goalStep.steps.filter(item => item.GoalId === id)
  );

  useEffect(() => {
    dispatch(fetchGoalDetails(id));
  }, [dispatch, id]);

  return goal ? (
    <>
      <Hidden lgUp>
        <DetailSmall goal={goal} steps={steps} />
      </Hidden>
      <Hidden mdDown>
        <DetailLarge goal={goal} steps={steps} />
      </Hidden>
    </>
  ) : (
    <Redirect to="/goals/current" />
  );
};

export default GoalDetails;
