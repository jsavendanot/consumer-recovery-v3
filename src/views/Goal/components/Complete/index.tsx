import React from 'react';
import { Goal, GoalCompletion } from 'types/goal';

import { makeStyles, withStyles } from '@material-ui/styles';
import { IconButton, LinearProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { Button } from 'common/components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '37px',
    color: '#4D3826'
  },
  description: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    margin: '20px 0'
  },
  closeButton: {
    textAlign: 'right'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  buttonContainer: {
    width: '100%'
  },
  subButtonContainer: {
    padding: '10px 0'
  },
  progress: {
    padding: '20px 0px'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 22,
    backgroundColor: '#FFFFFF',
    border: '1px solid #73BA9B'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#6CD0A5'
  }
})(LinearProgress);

type Props = {
  close: () => void;
  goal: Goal;
};

const Complete: React.FC<Props> = ({ goal, close }) => {
  const classes = useStyles();

  const completionRate: GoalCompletion[] = useSelector(
    (state: RootState) => state.goalRoot.goal.completionRate
  );

  const totalSteps = completionRate.find(item => item.GoalId === goal.Id)
    ?.TotalSteps;

  const completedSteps = completionRate.find(item => item.GoalId === goal.Id)
    ?.TotalStepsCompleted;

  const handleClose = () => {
    close();
  };

  return (
    <>
      <div className={classes.closeButton}>
        <IconButton style={{ padding: '0' }} onClick={close}>
          <Close fontSize="large" style={{ fill: '#73BA9B' }} />
        </IconButton>
      </div>
      <div className={classes.container}>
        <div className={classes.header}>
          <span className={classes.title}>Way to goal!</span>
          <img src="/images/goal/checkin/complete/Jiemba.svg" alt="" />
        </div>
        <span className={classes.description}>
          {totalSteps! - completedSteps!} steps left to achieve{' '}
          {goal != null ? goal.Name : ''}
        </span>
      </div>
      <div className={classes.progress}>
        <BorderLinearProgress
          variant="determinate"
          color="primary"
          value={
            completionRate.find(item => item.GoalId === goal.Id)!
              .PercentageCompletion * 100
          }
        />
      </div>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src="/images/goal/checkin/complete/Kirra.svg" alt="" />
          <img src="/images/goal/checkin/complete/Gary.svg" alt="" />
        </div>
        <div className={classes.buttonContainer}>
          <div className={classes.subButtonContainer}>
            <Button type="secondary" click={handleClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complete;
