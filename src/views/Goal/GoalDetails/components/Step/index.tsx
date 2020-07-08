import React from 'react';
import { Step as StepType, StepShareNetwork } from 'types/goal';
import useRouter from 'common/utils/useRouter';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Divider } from '@material-ui/core';
import {
  CheckCircle,
  RemoveRedEye,
  Refresh,
  CalendarToday,
  Edit
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  divider: {
    border: '1px solid #73BA9B',
    background: '#73BA9B',
    margin: '10px 0 20px'
  },
  tabContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  },
  stepContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px'
  },
  subStepContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px 0'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  completed: {
    padding: '10px',
    background: '#73BA9B',
    borderRadius: '6px',
    color: '#FFFFFF',
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px'
  },
  pending: {
    padding: '10px',
    background: '#FFFFFF',
    borderRadius: '6px',
    color: '#F79221',
    fontFamily: 'Scada',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    border: '1px solid #F79221'
  }
}));

type Props = {
  step: StepType;
  checkIn: (stepId: string) => void;
};

export const Step: React.FC<Props> = ({ step, checkIn }) => {
  const classes = useStyles();
  const { history, location } = useRouter();

  const stepsSharedNetworks: StepShareNetwork[] = useSelector(
    (state: RootState) => state.goalRoot.goalShare.stepsShare
  );

  const handleEdit = () => {
    history.push(`${location.pathname}/step/${step.Id}`);
  };

  return (
    <>
      <Grid item xs={12}>
        <div
          className={classes.tabContainer}
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}>
          {step.IsCompleted ? (
            <IconButton>
              <CheckCircle style={{ fill: '#73BA9B' }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => checkIn(step.Id)}>
              <CheckCircle style={{ fill: '#f1d4b2' }} />
            </IconButton>
          )}

          <div className={classes.stepContainer}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={classes.text} style={{ flexGrow: 1 }}>
                {step.Name}
              </div>
              {!step.IsCompleted && (
                <IconButton onClick={handleEdit}>
                  <Edit style={{ fill: '#73BA9B' }} />
                </IconButton>
              )}
            </div>
            <div className={classes.subStepContainer}>
              <div style={{ flexGrow: 1 }}>
                {step.IsDeadline ? (
                  <>
                    <IconButton style={{ padding: '0', marginRight: '10px' }}>
                      <CalendarToday style={{ fill: '#73BA9B' }} />
                    </IconButton>
                    {moment(step.StartDate).format('DD MMM YYYY')}
                  </>
                ) : (
                  <>
                    <IconButton style={{ padding: '0', marginRight: '10px' }}>
                      <Refresh style={{ fill: '#73BA9B' }} />
                    </IconButton>
                    {`${step.RepeatTimes} ${
                      step.RepeatUnit
                    } every ${step.RepeatFrequency.toLocaleLowerCase()} until ${
                      step.RepeatTotalTimes
                    } ${step.RepeatUnit}`}
                  </>
                )}
              </div>
              {step.IsCompleted ? (
                <div className={classes.completed}>Completed</div>
              ) : (
                <div>
                  {!step.IsDeadline && (
                    <div
                      className={
                        classes.pending
                      }>{`${step.visitsLeft} ${step.RepeatUnit} left`}</div>
                  )}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'left' }}>
              <IconButton style={{ padding: '0', marginRight: '10px' }}>
                <RemoveRedEye />
              </IconButton>
              {step.VisibleTo === 'Network' && <span>All my network</span>}
              {step.VisibleTo === 'OnlyMe' && <span>Only me</span>}
              {step.VisibleTo === 'SpecificPeople' && (
                <span>
                  Specific{' '}
                  {stepsSharedNetworks
                    .filter(network => network.StepId === step.Id)
                    .map((item, index) => {
                      return <b key={index}>{item.SharedWithNetworkName}</b>;
                    })}
                </span>
              )}
            </div>
          </div>
        </div>
        <Divider className={classes.divider} />
      </Grid>
    </>
  );
};

export default Step;
