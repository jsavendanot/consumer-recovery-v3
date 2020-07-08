import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { FocusArea } from 'types/other';

import { makeStyles } from '@material-ui/styles';
import { IconButton, Theme } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { Button, Loader, SubmitConfirmation } from 'common/components';
import { Step } from '../components';
import { Goal, Step as StepType } from 'types/goal';
import { Network } from 'types/network';
import { RootState } from 'reducer';
import {
  acceptGoalSuggestion,
  rejectGoalSuggestion
} from 'slices/suggestion/goal/action';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '45px'
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
    fill: '#003E1F',
    margin: '0 10px'
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '41px',
    color: '#FFFFFF'
  },
  backText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#73BA9B'
  },
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    padding: '20px 10%'
  },
  container: {
    width: '80%',
    padding: '0 10px'
  },
  textField: {
    width: '100%',
    margin: '10px 0 30px'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#73BA9B',
    margin: '5px 0'
  },
  deadlineText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#323F45'
  },
  deadlineDate: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#37474F'
  },
  stepsContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  goalDesc: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#003E1F'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

type Props = {
  goal: Goal;
  steps: StepType[];
};

const ReviewLargeScreen: React.FC<Props> = ({ goal, steps }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const loading: boolean = useSelector(
    (state: RootState) => state.goalRoot.goal.loading
  );

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [focusArea] = useState<FocusArea>(
    focusAreas.find(area => area.id === goal.FocusArea)!
  );

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  const [actionType, setActionType] = useState('');

  /** Dialog */
  const [open, setOpen] = useState(false);

  const openDialog = (action: string) => {
    setActionType(action);
    setOpen(true);
  };

  function closeDialog() {
    setOpen(false);
  }

  const approveSuggestion = () => {
    if (goal.SuggestionId) {
      dispatch(acceptGoalSuggestion(history, goal.SuggestionId));
    }
  };

  const rejectSuggestion = () => {
    if (goal.SuggestionId) {
      dispatch(rejectGoalSuggestion(history, goal.SuggestionId));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={classes.root}>
        <div className={classes.header}>
          <IconButton style={{ padding: '0' }} onClick={() => history.goBack()}>
            <KeyboardArrowLeft className={classes.headerIcon} />
          </IconButton>
          <span className={classes.backText}>Back</span>
        </div>
        <div className={classes.container}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '40px 10%',
              marginBottom: '20px',
              backgroundColor: '#73BA9B'
            }}>
            <span className={classes.headerText}>
              This goal needs your
              <br />
              approval before it can
              <br />
              become yours.
            </span>
            <img src="/images/goal/confirmation.svg" alt="" />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <span className={classes.title}>Goal Name</span>
          </div>
          <div style={{ padding: '10px 0 20px' }}>
            <span className={classes.goalDesc}>{goal.Name}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <span className={classes.subTitle}>Goal Created By</span>
          </div>
          <div style={{ padding: '10px 0 20px' }}>
            <span className={classes.textField}>
              {
                networks.find(item => item.UserId === goal.SuggestedByUserId)
                  ?.Name
              }
            </span>
          </div>
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '50%', paddingRight: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                <span className={classes.subTitle}>Goal Description</span>
              </div>
              <div className={classes.textField}>{goal.Description}</div>
            </div>
            <div style={{ width: '50%', paddingLeft: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <span className={classes.subTitle}>Goal Deadline</span>
              </div>
              <div style={{ margin: '10px 0', paddingRight: '60px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '10px 0'
                  }}>
                  <span className={classes.deadlineText}>Start Date</span>
                  <span className={classes.deadlineDate}>
                    {moment(new Date(goal.StartDate)).format(
                      'DD / MMMM / YYYY'
                    )}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '10px 0'
                  }}>
                  <span
                    className={classes.deadlineText}
                    style={{ marginRight: '10px' }}>
                    End Date
                  </span>
                  <span className={classes.deadlineDate}>
                    {goal.IsDeadline
                      ? moment(new Date(goal.EndDate)).format(
                          'DD / MMMM / YYYY'
                        )
                      : 'No deadline'}
                  </span>
                </div>
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
                      padding: '20px',
                      backgroundColor: `${focusArea.color}`
                    }}>
                    {goal.Image !== '' ? (
                      <img
                        src={'data:image/png;base64,' + goal.Image}
                        alt=""
                        style={{ width: 200, height: 160 }}
                      />
                    ) : (
                      <img
                        src={'/images/areas/' + focusArea.image}
                        alt=""
                        style={{ width: 200, height: 160 }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ margin: '30px 0 20px' }}>
            <span className={classes.subTitle}>Steps</span>
            <div className={classes.stepsContainer}>
              {steps.map((step, index) => (
                <div style={{ width: '50%' }} key={index}>
                  <Step step={step} number={index + 1} />
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              width: '100%',
              margin: '70px 0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div style={{ width: '30%', margin: '0 20px' }}>
              <Button type="secondary" click={() => openDialog('reject')}>
                Decline
              </Button>
            </div>
            <div style={{ width: '30%', margin: '0 20px' }}>
              <Button type="primary" click={() => openDialog('accept')}>
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <SubmitConfirmation
          open={open}
          close={closeDialog}
          action={
            actionType === 'accept' ? approveSuggestion : rejectSuggestion
          }
          donRedirect>
          {actionType === 'accept' ? (
            <span className={classes.confirmTitle}>
              This goal will become yours
              <br />
              when you approve.
            </span>
          ) : (
            <span className={classes.confirmTitle}>
              Are you sure you want to decline
              <br />
              this goal suggestion
            </span>
          )}
        </SubmitConfirmation>
      )}
    </>
  );
};

export default ReviewLargeScreen;
