import React from 'react';
import moment from 'moment';
import { StepForm as StepFormType } from 'types/goal';

import { makeStyles } from '@material-ui/styles';
import { IconButton, Theme } from '@material-ui/core';
import { CalendarToday, RemoveRedEye, Refresh } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  formGroup: {
    marginBottom: theme.spacing(2)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  options: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  textField: {
    marginRight: '10px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '35px',
    color: '#003E1F'
  },
  stepsContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '10px 20px',
    margin: '10px 0'
  },
  stepContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '20px',
    marginLeft: '20px'
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
  number: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '50px',
    lineHeight: '62px',
    color: '#003E1F'
  },
  selectedNetwork: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B'
  }
}));

type Props = {
  step: StepFormType;
  number: number;
};

const Step: React.FC<Props> = (props: Props) => {
  const { number, step } = props;
  const classes = useStyles();

  return (
    <div className={classes.stepsContainer} key={step.id}>
      <span className={classes.number}>{number}</span>
      <div className={classes.stepContainer}>
        <div style={{ width: '220px', overflowWrap: 'break-word' }}>
          <span className={classes.text}>{step.name}</span>
        </div>
        <div className={classes.subStepContainer}>
          <div style={{ flexGrow: 1 }}>
            {step.dateTime.switch && (
              <>
                <IconButton style={{ padding: '0', marginRight: '10px' }}>
                  <CalendarToday style={{ fill: '#73BA9B' }} />
                </IconButton>
                {moment(step.dateTime.reminderDate).format('DD MMMM YYYY')}
              </>
            )}
            {step.repeat.switch && (
              <>
                <IconButton style={{ padding: '0', marginRight: '10px' }}>
                  <Refresh style={{ fill: '#73BA9B' }} />
                </IconButton>
                {`${step.repeat.number} ${step.repeat.type} every ${step.repeat.frequencyNumber} ${step.repeat.frequencyType}`}
              </>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <IconButton style={{ padding: '0', marginRight: '10px' }}>
            <RemoveRedEye />
          </IconButton>
          {step.share.whoCanSee === 'Network' && <span>All my network</span>}
          {step.share.whoCanSee === 'OnlyMe' && <span>Only me</span>}
          {step.share.whoCanSee === 'SpecificPeople' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}>
              <span>Specific</span>
              {step.share.network.length === 1 && (
                <div className={classes.selectedNetwork}>
                  {step.share.network[0].Name}...
                </div>
              )}
              {step.share.network.length >= 2 && (
                <div className={classes.selectedNetwork}>
                  {step.share.network[0].Name},{step.share.network[1].Name}...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step;
