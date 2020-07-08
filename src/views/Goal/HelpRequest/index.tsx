import React from 'react';
import { Hidden } from '@material-ui/core';
import LargeScreen from './LargeScreen';
import SmallScreen from './SmallScreen';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Goal } from 'types/goal';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

const HelpRequest: React.FC<Props> = ({ match }) => {
  const { id } = match.params;

  const goal: Goal = useSelector(
    (state: RootState) =>
      state.goalRoot.goal.goals.find(item => item.Id === id)!
  );

  return goal ? (
    <>
      <Hidden lgUp>
        <SmallScreen goal={goal} />
      </Hidden>
      <Hidden mdDown>
        <LargeScreen goal={goal} />
      </Hidden>
    </>
  ) : (
    <Redirect to="/goals/current" />
  );
};

export default HelpRequest;
