import React from 'react';
import moment from 'moment';

import { makeStyles, withStyles } from '@material-ui/styles';
import { Grid, LinearProgress, Hidden } from '@material-ui/core';
import { GoalCompletion } from 'types/goal';

const useStyles = makeStyles(() => ({
  headerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '45px',
    color: '#003E1F',
    textTransform: 'uppercase'
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  value: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  progress: {
    padding: '10px 0px'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: '#D0DED7'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#6CD0A5'
  }
})(LinearProgress);

type Props = {
  goalCompletion: GoalCompletion;
};

export const GoalProgress: React.FC<Props> = ({ goalCompletion }) => {
  const classes = useStyles();
  return (
    <>
      <Hidden mdDown>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <span className={classes.headerText}>
            {goalCompletion && goalCompletion.GoalName}
          </span>
        </Grid>
      </Hidden>
      <Grid item xs={12}>
        <div className={classes.tabContainer}>
          <div style={{ flexGrow: 1 }}>
            <span className={classes.title}>Start Date</span>
          </div>
          <div style={{ flexGrow: 1, textAlign: 'right' }}>
            <span className={classes.value}>
              {goalCompletion &&
                moment(goalCompletion.StartDate).format('DD MMMM YYYY')}
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.tabContainer}>
          <div style={{ flexGrow: 1 }}>
            <span className={classes.title}>End Date</span>
          </div>
          <div style={{ flexGrow: 1, textAlign: 'right' }}>
            <span className={classes.value}>
              {goalCompletion && goalCompletion.Deadline
                ? moment(goalCompletion.EndDate).format('DD MMMM YYYY')
                : 'No deadline'}
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.tabContainer}>
          <div style={{ flexGrow: 1 }}>
            <span className={classes.title}>Progress</span>
          </div>
          <div style={{ flexGrow: 1, textAlign: 'right' }}>
            {goalCompletion && (
              <span
                className={
                  classes.value
                }>{`${goalCompletion.CompletedRepetition}/${goalCompletion.TotalStepRepetition} completed`}</span>
            )}
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.tabContainer}>
          <div style={{ flexGrow: 1 }}>
            <span className={classes.title}>Target</span>
          </div>
          <div style={{ flexGrow: 1, textAlign: 'right' }}>
            <span className={classes.value}>
              {goalCompletion && goalCompletion.TotalSteps + ' steps'}
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.progress}>
          <BorderLinearProgress
            variant="determinate"
            color="primary"
            value={
              goalCompletion ? goalCompletion.PercentageCompletion * 100 : 0
            }
          />
        </div>
      </Grid>
    </>
  );
};

export default GoalProgress;
