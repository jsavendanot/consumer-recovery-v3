import React, { useState, useContext } from 'react';
import moment from 'moment';
import produce from 'immer';

import { makeStyles } from '@material-ui/styles';
import { Switch } from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker } from '@material-ui/pickers';
import GoalContext from '../../../../GoalContext';
import { GoalForm } from 'types/goal';

const useStyles = makeStyles(() => ({
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003E1F',
    margin: '5px 0'
  },
  deadlineText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  },
  deadlineDate: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#37474F'
  }
}));

type TriggerDateTypes = 'startDate' | 'endDate' | '';

export const Deadline: React.FC = () => {
  const { goal, setGoal } = useContext(GoalContext!);
  const classes = useStyles();

  /** Calendar for Deadline */
  const [calendarTrigger, setCalendarTrigger] = useState<TriggerDateTypes>('');
  const handleCalendarOpen = (trigger: TriggerDateTypes) => {
    setCalendarTrigger(trigger);
  };
  const handleCalendarChange = () => {};
  const handleCalendarAccept = (date: MaterialUiPickersDate) => {
    if (calendarTrigger === 'startDate') {
      setGoal(
        produce((draft: GoalForm) => {
          draft.deadline.startDate = date!.toString();
          draft.deadline.endDate = moment(date!.toString())
            .add(1, 'day')
            .toString();
        })
      );
    }
    if (calendarTrigger === 'endDate') {
      setGoal(
        produce((draft: GoalForm) => {
          draft.deadline.endDate = date!.toString();
        })
      );
    }
  };

  const handleCalendarClose = () => {
    setCalendarTrigger('');
  };
  const calendarOpen = Boolean(calendarTrigger);
  const calendarMinDate =
    calendarTrigger === 'startDate'
      ? moment()
      : moment(new Date(goal.deadline.startDate)).add(1, 'day');
  let calendarValue = '';
  if (calendarTrigger === 'startDate' || calendarTrigger === 'endDate') {
    calendarValue = goal.deadline[calendarTrigger];
  }

  const handleDeadlineFields = (value: boolean) => {
    setGoal(
      produce((draft: GoalForm) => {
        draft.deadline.switch = value;
      })
    );

    if (!value) {
      setGoal(
        produce((draft: GoalForm) => {
          draft.deadline.startDate = moment().toString();
          draft.deadline.endDate = '';
        })
      );
    }

    if (value) {
      setGoal(
        produce((draft: GoalForm) => {
          draft.deadline.startDate = moment().toString();
          draft.deadline.endDate = moment()
            .add(1, 'day')
            .toString();
        })
      );
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <span className={classes.subTitle}>Goal Deadline</span>
        <Switch
          checked={goal.deadline.switch}
          color="primary"
          edge="start"
          name="deadline"
          onChange={() => handleDeadlineFields(!goal.deadline.switch)}
        />
      </div>
      {goal.deadline.switch && (
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
              {moment(new Date(goal.deadline.startDate)).format(
                'DD / MM / YYYY'
              )}
            </span>
            <DateRange
              onClick={() => handleCalendarOpen('startDate')}
              style={{
                fill: 'rgba(0, 62, 31, 0.78)',
                marginRight: '5px'
              }}
            />
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
              {moment(new Date(goal.deadline.endDate)).format('DD / MM / YYYY')}
            </span>
            <DateRange
              onClick={() => handleCalendarOpen('endDate')}
              style={{
                fill: 'rgba(0, 62, 31, 0.78)',
                marginRight: '5px'
              }}
            />
          </div>
        </div>
      )}
      <DatePicker
        minDate={calendarMinDate}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={calendarOpen}
        style={{ display: 'none' }}
        value={calendarValue}
        variant="dialog"
      />
    </div>
  );
};

export default Deadline;
