import React, { useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoals } from 'slices/goal/action';
import { RootState } from 'reducer';
import { Goal as GoalType } from 'types/goal';

import { makeStyles } from '@material-ui/styles';
import { Hidden, IconButton, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Loader } from 'common/components';
import { isEqual } from 'lodash';

import { CurrentGoal, CompletedGoal, ButtonTabs } from './components';
import { fetchEmergencyContacts } from 'slices/safety/support/action';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginTop: '20px',
    padding: '0 20px'
  },
  headerTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: '#37474F',
    textTransform: 'capitalize'
    // marginRight: '10%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '40px 0 20px',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '158px',
      marginRight: '158px'
    }
  },
  addIcon: {
    fontSize: '42px',
    fill: '#37474F'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Goal: React.FC<Props> = ({ match, history }) => {
  const classes = useStyles();
  const { tab } = match.params;
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.goalRoot.goal.loading
  );

  const goals: GoalType[] = useSelector(
    (state: RootState) => state.goalRoot.goal.goals,
    isEqual
  );

  const suggestedGoals: GoalType[] = useSelector(
    (state: RootState) => state.suggestion.goals,
    isEqual
  );

  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchEmergencyContacts());
  }, [dispatch]);

  if (sessionStorage.getItem('DateOfBirth') === 'null') {
    return (
      <Redirect to={`/profile/${sessionStorage.getItem('FirstName')}/create`} />
    );
  }

  if (tab !== 'current' && tab !== 'completed') {
    return <Redirect to="/goals/current" />;
  }

  return (
    <>
      {loading && <Loader />}
      <Hidden lgUp>
        <ButtonTabs tabs={['current', 'completed']} currentTab={tab} />
        <div className={classes.content}>
          {tab === 'current' && (
            <CurrentGoal goals={goals.concat(suggestedGoals)} />
          )}
          {tab === 'completed' && <CompletedGoal goals={goals} />}
        </div>
      </Hidden>
      <Hidden mdDown>
        <div className={classes.header}>
          <span className={classes.headerTitle}>My Goals</span>
          <ButtonTabs tabs={['current', 'completed']} currentTab={tab} />
          <IconButton
            onClick={() => history.push('/create/goal')}
            style={{ marginLeft: '30px' }}>
            <Add className={classes.addIcon} />
          </IconButton>
        </div>
        <div className={classes.content}>
          {tab === 'current' && (
            <CurrentGoal goals={goals.concat(suggestedGoals)} />
          )}
          {tab === 'completed' && <CompletedGoal goals={goals} />}
        </div>
      </Hidden>
    </>
  );
};

export default Goal;
