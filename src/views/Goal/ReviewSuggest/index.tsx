import React from 'react';

import { Hidden } from '@material-ui/core';

import LargeScreen from './LargeScreen';
import SmallScreen from './SmallScreen';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Goal, Step } from 'types/goal';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

const ReviewSuggest: React.FC<Props> = ({ match }) => {
  const { id } = match.params;

  const suggestedGoals: Goal = useSelector(
    (state: RootState) => state.suggestion.goals.find(item => item.Id === id)!
  );

  const suggestedSteps: Step[] = useSelector((state: RootState) =>
    state.suggestion.steps.filter(item => item.GoalId === id)
  );

  return suggestedGoals ? (
    <>
      <Hidden lgUp>
        <SmallScreen goal={suggestedGoals} steps={suggestedSteps} />
      </Hidden>
      <Hidden mdDown>
        <LargeScreen goal={suggestedGoals} steps={suggestedSteps} />
      </Hidden>
    </>
  ) : (
    <Redirect to="/goals/current" />
  );
};

export default ReviewSuggest;
