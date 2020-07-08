import React from 'react';
import { Goal } from 'types/goal';

import { makeStyles } from '@material-ui/styles';
import { Grid, Theme } from '@material-ui/core';

import { GoalCard } from '../components';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
      paddingLeft: '124px',
      paddingRight: '124px'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start',
      paddingLeft: '124px',
      paddingRight: '124px'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    textAlign: 'center',
    color: '#B3B3B3',
    margin: '20px 0'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%'
  }
}));

type Props = {
  goals: Goal[];
};

const CompletedGoal: React.FC<Props> = ({ goals }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        {goals.length === 0 && (
          <div className={classes.content}>
            <span className={classes.text}>You don't have any goals yet.</span>
            <img src="/images/goal/jiemba.svg" alt="" />
          </div>
        )}
      </Grid>
      {goals.length > 0 &&
        goals
          .filter(item => item.PercentageComplete === 1)
          .map(goal => (
            <Grid
              item
              xs={12}
              sm={8}
              md={4}
              lg={4}
              key={goal.Id}
              className={classes.item}>
              <GoalCard goal={goal} />
            </Grid>
          ))}
      <Grid item xs={12} sm={6} md={4} lg={3} />
    </Grid>
  );
};

export default CompletedGoal;
