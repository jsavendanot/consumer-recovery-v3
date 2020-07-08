import React, { useContext, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal } from 'slices/goal/action';
import useRouter from 'common/utils/useRouter';
import GoalContext from '../../GoalContext';
import { FocusArea } from 'types/other';
import produce from 'immer';

import { IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { Button, Loader } from 'common/components';
import { Step } from './components';
import { GoalForm } from 'types/goal';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    background: '#73BA9B',
    padding: '15px 10px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 10%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 10%'
    }
  },
  headerIcon: {
    fontSize: '42px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '52px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '52px'
    },
    fill: '#FFFFFF'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '41px',
    color: '#FFFFFF',
    margin: '10px 0 0 10px',
    [theme.breakpoints.up('sm')]: {
      margin: '10px 0 0 30px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '10px 0 0 30px'
    },
    [theme.breakpoints.up('lg')]: {
      margin: '10px 0 0 30px'
    }
  },
  body: {
    padding: '20px 15px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 20%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 20%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '20px 20%'
    }
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  highlightedText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#003E1F',
    padding: '5px 0'
  },
  descText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45',
    padding: '5px 0'
  },
  dateText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '196px'
  }
}));

const GoalReviewSmallScreen: React.FC = () => {
  const classes = useStyles();
  const { goal, setGoal, step, setConfirm } = useContext(GoalContext);
  const dispatch = useDispatch();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.goalRoot.goal.loading
  );

  const handleSubmit = () => {
    dispatch(createGoal(history, goal));
  };

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [focusArea] = useState<FocusArea>(
    focusAreas.find(area => area.id === goal.focusAreaId)!
  );

  const handleBackButton = () => {
    setGoal(
      produce((draft: GoalForm) => {
        draft.steps = draft.steps.filter(item => item.id !== step.id);
      })
    );
    setConfirm(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div className={classes.header}>
        <IconButton style={{ padding: '0' }} onClick={handleBackButton}>
          <KeyboardArrowLeft className={classes.headerIcon} />
        </IconButton>
        <span className={classes.headerText}>
          Almost there!
          <br />
          Let’s review your goal.
        </span>
        <div
          style={{
            width: '100%',
            margin: '30px 0 10px',
            display: 'flex',
            justifyContent: 'center'
          }}>
          <img src="/images/goal/confirmation.svg" alt="" />
        </div>
      </div>
      <div className={classes.body}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px 0 30px'
          }}>
          <span className={classes.subTitle}>Goal Name</span>
          <div className={classes.highlightedText}>{goal.name}</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px 0'
          }}>
          <span className={classes.subTitle}>Goal Description</span>
          <div className={classes.descText}>{goal.desc}</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '15px 0'
          }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0'
            }}>
            <span className={classes.subTitle}>Start Date</span>
            <span className={classes.dateText}>
              {moment(new Date(goal.deadline.startDate)).format('DD MMMM YYYY')}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0'
            }}>
            <span className={classes.subTitle}>End Date</span>
            <span className={classes.dateText}>
              {goal.deadline.switch
                ? moment(new Date(goal.deadline.endDate)).format('DD MMMM YYYY')
                : 'No deadline'}
            </span>
          </div>
          <div style={{ padding: '10px 0', margin: '10px 0' }}>
            <span className={classes.subTitle}>Steps</span>
            {goal.steps.map((step, index) => (
              <Step step={step} number={index + 1} key={index} />
            ))}
          </div>
          <div style={{ margin: '30px 0 20px' }}>
            <span className={classes.subTitle}>Goal Image</span>
            {focusArea && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '20px',
                  backgroundColor: `${focusArea.color}`
                }}>
                {goal.image !== '' ? (
                  <img
                    src={'data:image/png;base64,' + goal.image}
                    alt=""
                    className={classes.image}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '20px',
                      backgroundColor: `${focusArea.color}`
                    }}>
                    <img
                      src={'/images/areas/' + focusArea.image}
                      alt=""
                      style={{ width: 200, height: 160 }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <div style={{ margin: '20px 0' }}>
              <Button type="secondary" click={handleBackButton}>
                Back to create goal
              </Button>
            </div>
            <div style={{ margin: '20px 0' }}>
              <Button type="primary" click={handleSubmit}>
                Confirm goal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalReviewSmallScreen;
