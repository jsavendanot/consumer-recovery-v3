import React, { useState, Dispatch, SetStateAction } from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/styles';
import { DatePicker } from '@material-ui/pickers';
import produce from 'immer';
import {
  Switch,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton
} from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import { StepForm } from 'types/goal';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles(() => ({
  textRepeat: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  reminderText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F'
  }
}));

type Props = {
  step: StepForm;
  setStep: Dispatch<SetStateAction<StepForm>>;
};

export const DateTime: React.FC<Props> = ({ step, setStep }) => {
  const classes = useStyles();

  /** Calendar for Reminder */
  const [calendarTrigger, setCalendarTrigger] = useState<'reminderDate' | ''>(
    ''
  );
  const handleCalendarOpen = (trigger: 'reminderDate' | '') => {
    setCalendarTrigger(trigger);
  };
  const handleCalendarChange = () => {};
  const handleCalendarAccept = (date: MaterialUiPickersDate) => {
    setStep(
      produce((draft: StepForm) => {
        draft.dateTime.reminderDate = date!.toString();
      })
    );
  };
  const handleCalendarClose = () => {
    setCalendarTrigger('');
  };
  const calendarOpen2 = Boolean(calendarTrigger);
  const calendarMinDate2 = moment();
  let calendarValue2 = '';
  if (calendarTrigger === 'reminderDate') {
    calendarValue2 = step.dateTime[calendarTrigger];
  }

  const handleStepField = (field: 'switch' | 'reminder', value: boolean) => {
    if (typeof value === 'boolean') {
      if (field === 'reminder') {
        setStep(
          produce((draft: StepForm) => {
            draft.dateTime.reminder = value;
          })
        );
      }

      if (field === 'switch') {
        setStep(
          produce((draft: StepForm) => {
            draft.dateTime.switch = value;
            draft.dateTime.reminderDate = moment(
              step.dateTime.reminderDate
            ).toString();
          })
        );
      }

      if (field === 'switch' && value) {
        if (step.repeat.switch) {
          setStep(
            produce((draft: StepForm) => {
              draft.repeat.switch = false;
            })
          );
        }
      }

      if (field === 'switch' && !value) {
        setStep(
          produce((draft: StepForm) => {
            draft.repeat.switch = true;
            draft.dateTime.reminder = false;
            draft.dateTime.reminderDate = moment(
              step.dateTime.reminderDate
            ).toString();
          })
        );
      }
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '5px 0'
        }}>
        <span className={classes.textRepeat}>Date / Time</span>
        <Switch
          checked={step.dateTime.switch}
          color="primary"
          edge="start"
          name="dateTime"
          onChange={() => handleStepField('switch', !step.dateTime.switch)}
        />
      </div>
      {step.dateTime.switch && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 10px'
          }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className={classes.reminderText}>
              {moment(new Date(step.dateTime.reminderDate)).format(
                'DD / MM / YYYY'
              )}
            </span>
            <IconButton
              onClick={() => handleCalendarOpen('reminderDate')}
              style={{ marginLeft: '20px' }}>
              <DateRange
                style={{
                  fill: 'rgba(0, 62, 31, 0.78)'
                }}
              />
            </IconButton>
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={step.dateTime.reminder}
                  onChange={event =>
                    handleStepField('reminder', event.target.checked)
                  }
                />
              }
              label={<span className={classes.reminderText}>Reminder?</span>}
            />
          </FormGroup>
        </div>
      )}
      <DatePicker
        minDate={calendarMinDate2}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen2}
        style={{ display: 'none' }}
        value={calendarValue2}
        variant="dialog"
      />
    </div>
  );
};

export default DateTime;
