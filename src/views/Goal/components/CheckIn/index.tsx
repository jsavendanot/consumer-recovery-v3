import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Goal, Step } from 'types/goal';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { checkInStep } from 'slices/goal/step/action';

import { makeStyles } from '@material-ui/styles';
import { IconButton, TextField, Radio } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';

import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
    color: '#73BA9B',
    marginBottom: '20px'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '19px',
    lineHeight: '25px',
    color: '#003E1F',
    marginBottom: '20px'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45'
  },
  buttonContainer: {
    display: 'flex',
    width: '100%'
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0'
  },
  selectContainer: {
    marginBottom: '10px',
    width: '100%',
    padding: '20px 10px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F'
  },
  buttonContent: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  options: {
    display: 'flex',
    width: '100%',
    margin: '10px 0'
  },
  subOptions: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

type RadioProps = {
  checked: boolean;
  onChange: ChangeEvent<HTMLButtonElement>;
  value: string;
  name: string;
};

type Props = {
  goal: Goal;
  steps: Step[];
  close: () => void;
  open: () => void;
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  stepId?: string;
};

const CheckIn: React.FC<Props> = ({
  goal,
  steps,
  close,
  open,
  selectedValue,
  setSelectedValue,
  stepId
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [id, setId] = useState(stepId ? stepId : steps[0].Id);

  const handleFieldChange = (id: string) => {
    setId(id);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const save = () => {
    handleClose();
    open();
    const step = steps.find(step => step.Id === id)!;
    dispatch(
      checkInStep(goal, step?.Id, step?.Name, selectedValue === 'complete')
    );
  };

  const handleClose = () => {
    setId('');
    close();
  };

  return (
    <div className={classes.container}>
      <span className={classes.title}>Progress Check-in</span>
      <span className={classes.subTitle}>{goal.Name}</span>
      <div className={classes.dateContainer}>
        <IconButton style={{ padding: '0', marginRight: '10px' }}>
          <CalendarToday />
        </IconButton>
        <span className={classes.text}>
          {moment(new Date(goal.StartDate)).format('dddd DD / MM / YYYY')}
        </span>
      </div>
      <div className={classes.selectContainer}>
        <TextField
          fullWidth
          label=""
          name="steps"
          select
          // eslint-disable-next-line react/jsx-sort-props
          SelectProps={{ native: true }}
          value={id}
          onChange={event => handleFieldChange(event.target.value)}
          variant="outlined">
          {steps
            .filter(item => !item.IsCompleted)
            .map(step => (
              <option key={step.Id} value={step.Id}>
                {step.Name}
              </option>
            ))}
        </TextField>
      </div>
      <div className={classes.options}>
        <div className={classes.subOptions}>
          <Radio
            color="primary"
            checked={selectedValue === 'incomplete'}
            onChange={handleChange}
            value="incomplete"
            name="incomplete"
          />
          <span className={classes.text}>Incomplete</span>
        </div>
        <div className={classes.subOptions}>
          <Radio
            color="primary"
            checked={selectedValue === 'complete'}
            onChange={handleChange}
            value="complete"
            name="complete"
          />
          <span className={classes.text}>Complete</span>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.buttonContent}>
          <span className={classes.buttonText} onClick={handleClose}>
            Cancel
          </span>
        </div>
        <div className={classes.buttonContent}>
          <Button type="extra" disabled={id === '0' || id === ''} click={save}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
