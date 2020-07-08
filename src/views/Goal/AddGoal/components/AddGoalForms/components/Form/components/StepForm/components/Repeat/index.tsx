import React, { SetStateAction, Dispatch } from 'react';

import { makeStyles } from '@material-ui/styles';
import { TextField, Switch, Select, FormControl } from '@material-ui/core';
import { StepForm } from 'types/goal';
import produce from 'immer';

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    margin: '10px 0 30px'
  },
  textRepeat: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  textEvery: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F',
    marginBottom: '20px'
  },
  targetText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '20px',
    color: '#003E1F',
    marginBottom: '18px'
  },
  selectFrequency: {
    width: '65%',
    backgroundColor: '#D5F2E3',
    border: '1px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '5px'
  }
}));

type Props = {
  step: StepForm;
  setStep: Dispatch<SetStateAction<StepForm>>;
};

export const Repeat: React.FC<Props> = ({ step, setStep }) => {
  const classes = useStyles();

  const handleStepField = (
    field:
      | 'switch'
      | 'number'
      | 'type'
      | 'frequencyNumber'
      | 'frequencyType'
      | 'targetNumber',
    value: string | boolean
  ) => {
    if (typeof value === 'boolean') {
      setStep(
        produce((draft: StepForm) => {
          draft.repeat.switch = value;
        })
      );

      if (field === 'switch' && value) {
        setStep(
          produce((draft: StepForm) => {
            draft.dateTime.switch = false;
          })
        );
      }

      if (field === 'switch' && !value) {
        setStep(
          produce((draft: StepForm) => {
            draft.dateTime.switch = true;
          })
        );
      }
    }
    if (typeof value === 'string') {
      setStep(values => ({
        ...values,
        repeat: {
          ...values['repeat'],
          [field]: value
        }
      }));
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
        <span className={classes.textRepeat}>Repeat</span>
        <Switch
          checked={step.repeat.switch}
          color="primary"
          edge="start"
          name="repeat"
          onChange={() => handleStepField('switch', !step.repeat.switch)}
        />
      </div>
      {step.repeat.switch && (
        <div style={{ padding: '0 10px', margin: '10px 0' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '20px'
            }}>
            <TextField
              id="outlined-basic"
              label=""
              type="number"
              autoComplete="off"
              placeholder="0"
              value={step.repeat.number ? step.repeat.number : ''}
              className={classes.textField}
              style={{ width: '20%' }}
              onChange={event => handleStepField('number', event.target.value)}
              inputProps={{
                max: 10,
                min: 0
              }}
            />
            <TextField
              id="outlined-basic"
              label=""
              autoComplete="off"
              placeholder="times"
              value={step.repeat.type}
              className={classes.textField}
              style={{ width: '30%' }}
              onChange={event => handleStepField('type', event.target.value)}
              inputProps={{ maxLength: 20 }}
            />
            <span className={classes.textEvery}>every</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '20px'
            }}>
            <TextField
              id="outlined-basic"
              label=""
              placeholder="0"
              type="number"
              autoComplete="off"
              value={
                step.repeat.frequencyNumber ? step.repeat.frequencyNumber : ''
              }
              className={classes.textField}
              style={{ width: '20%', marginBottom: '5px' }}
              onChange={event =>
                handleStepField('frequencyNumber', event.target.value)
              }
              inputProps={{
                max: 31,
                min: 0
              }}
            />
            <FormControl variant="outlined" className={classes.selectFrequency}>
              <Select
                native
                value={step.repeat.frequencyType}
                onChange={event =>
                  handleStepField('frequencyType', event.target.value as string)
                }
                inputProps={{
                  name: 'frequency',
                  id: 'frequencyType'
                }}>
                <option value="day">day</option>
                <option value="week">week</option>
                <option value="month">month</option>
                <option value="year">year</option>
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '30px 0',
              paddingRight: '20px'
            }}>
            <span className={classes.targetText}>Target:</span>
            <TextField
              id="outlined-basic"
              label=""
              placeholder="0"
              type="number"
              autoComplete="off"
              value={step.repeat.targetNumber ? step.repeat.targetNumber : ''}
              className={classes.textField}
              style={{ width: '30%' }}
              onChange={event =>
                handleStepField('targetNumber', event.target.value)
              }
              inputProps={{
                max: 100,
                min: 0
              }}
            />
            <span className={classes.textEvery}>
              {step.repeat.type !== '' ? step.repeat.type : 'times'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Repeat;
