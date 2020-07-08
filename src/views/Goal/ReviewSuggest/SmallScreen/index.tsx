import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { FocusArea } from 'types/other';

import { IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { Button, SubmitConfirmation, Loader } from 'common/components';
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

const ReviewSmallScreen: React.FC<Props> = ({ goal, steps }) => {
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
      <div className={classes.header}>
        <IconButton style={{ padding: '0' }} onClick={() => history.goBack()}>
          <KeyboardArrowLeft className={classes.headerIcon} />
        </IconButton>
        <span className={classes.headerText}>
          This goal needs your
          <br />
          approval before it can
          <br />
          become yours.
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
          <div className={classes.highlightedText}>{goal.Name}</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '20px 0'
          }}>
          <span className={classes.subTitle}>Goal Created By</span>
          <div className={classes.descText}>
            {
              networks.find(item => item.UserId === goal.SuggestedByUserId)
                ?.Name
            }
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px 0'
          }}>
          <span className={classes.subTitle}>Goal Description</span>
          <div className={classes.descText}>{goal.Description}</div>
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
              {moment(new Date(goal.StartDate)).format('DD MMMM YYYY')}
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
              {goal.IsDeadline
                ? moment(new Date(goal.EndDate)).format('DD MMMM YYYY')
                : 'No deadline'}
            </span>
          </div>
          <div style={{ padding: '10px 0', margin: '10px 0' }}>
            <span className={classes.subTitle}>Steps</span>
            {steps.map((step, index) => (
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
          <div>
            <div style={{ margin: '20px 0' }}>
              <Button type="secondary" click={() => openDialog('reject')}>
                Decline
              </Button>
            </div>
            <div style={{ margin: '20px 0' }}>
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

export default ReviewSmallScreen;
