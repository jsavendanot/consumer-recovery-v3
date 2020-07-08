import React from 'react';
import moment from 'moment';
import { Step as StepType } from 'types/goal';

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
  step: StepType;
  number: number;
};

const Step: React.FC<Props> = ({ number, step }) => {
  const classes = useStyles();

  return (
    <div className={classes.stepsContainer} key={step.Id}>
      <span className={classes.number}>{number}</span>
      <div className={classes.stepContainer}>
        <div style={{ width: '220px', overflowWrap: 'break-word' }}>
          <span className={classes.text}>{step.Name}</span>
        </div>
        <div className={classes.subStepContainer}>
          <div style={{ flexGrow: 1 }}>
            {step.IsDeadline && (
              <>
                <IconButton style={{ padding: '0', marginRight: '10px' }}>
                  <CalendarToday style={{ fill: '#73BA9B' }} />
                </IconButton>
                {moment(step.EndDate).format('DD MMMM YYYY')}
              </>
            )}
            {!step.IsDeadline && (
              <>
                <IconButton style={{ padding: '0', marginRight: '10px' }}>
                  <Refresh style={{ fill: '#73BA9B' }} />
                </IconButton>
                {`${step.RepeatTimes} ${step.RepeatUnit} every  ${step.RepeatFrequency}`}
              </>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          <IconButton style={{ padding: '0', marginRight: '10px' }}>
            <RemoveRedEye />
          </IconButton>
          {step.VisibleTo === 'Network' && <span>All my network</span>}
          {step.VisibleTo === 'OnlyMe' && <span>Only me</span>}
          {step.VisibleTo === 'SpecificPeople' && <span>Specific people</span>}
        </div>
      </div>
    </div>
  );
};

export default Step;
