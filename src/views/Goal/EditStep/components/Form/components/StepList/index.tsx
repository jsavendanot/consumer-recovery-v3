import React, { useContext } from 'react';
import moment from 'moment';
import GoalContext from '../../../../GoalContext';
import produce from 'immer';

import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Divider,
  Switch,
  FormControl,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  IconButton
} from '@material-ui/core';
import { StepForm, GoalForm } from 'types/goal';
import {
  Delete,
  People,
  Lock,
  PersonPin,
  KeyboardArrowRight
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
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
    color: '#003E1F',
    margin: '5px 0'
  },
  stepNumberText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '193.69%',
    color: '#73BA9B'
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
  shareText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  },
  step: {
    width: '100%',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'normal',
    float: 'left',
    marginRight: 10
  },
  selectFrequency: {
    width: '65%',
    backgroundColor: '#D5F2E3',
    border: '1px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '5px',
    paddingLeft: '10px'
  },
  reminderText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F'
  },
  stepName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F',
    boxSizing: 'border-box',
    margin: '10px 0 10px',
    height: '65px',
    overflow: 'auto'
  },
  selectedNetwork: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B'
  },
  divider: {
    border: '1px solid #73BA9B'
  }
}));

type Props = {
  step: StepForm;
  index: number;
};

export const StepList: React.FC<Props> = ({ step, index }) => {
  const classes = useStyles();
  const { goal, setGoal } = useContext(GoalContext!);

  const deleteStep = (id: string) => {
    const updatedSteps = goal.steps.filter(value => value.id !== id);
    setGoal(
      produce((draft: GoalForm) => {
        draft.steps = updatedSteps;
      })
    );
  };

  return (
    <div className={classes.step}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          margin: '18px 0 5px'
        }}>
        <span className={classes.stepNumberText}>Step {index + 1}</span>
        <IconButton
          onClick={() => deleteStep(step.id)}
          style={{ marginLeft: '20px' }}>
          <Delete style={{ fill: '#73BA9B' }} />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <div
            style={{
              marginRight: '11px'
            }}>
            <div className={classes.stepName}>{step.name}</div>
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
                    placeholder=""
                    className={classes.textField}
                    style={{ width: '20%' }}
                    value={step.repeat.number}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label=""
                    placeholder=""
                    className={classes.textField}
                    style={{ width: '30%' }}
                    value={step.repeat.type}
                    InputProps={{
                      readOnly: true
                    }}
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
                    placeholder=""
                    multiline
                    className={classes.textField}
                    style={{ width: '20%', marginBottom: '5px' }}
                    value={step.repeat.frequencyNumber}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.selectFrequency}>
                    <Select
                      native
                      value={step.repeat.frequencyType}
                      inputProps={{
                        name: 'frequency',
                        id: 'filled-frequency-native-simple',
                        readOnly: true
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
                    placeholder="100"
                    multiline
                    className={classes.textField}
                    style={{ width: '40%' }}
                    value={step.repeat.targetNumber}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <span className={classes.textEvery}>{step.repeat.type}</span>
                </div>
              </div>
            )}
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
              />
            </div>
            {step.dateTime.switch && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '10px 0',
                  padding: '0 10px'
                }}>
                <span className={classes.reminderText}>
                  {moment(new Date(step.dateTime.reminderDate)).format(
                    'dddd DD / MM / YYYY'
                  )}
                </span>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={step.dateTime.reminder}
                        value=""
                      />
                    }
                    label={
                      <span className={classes.reminderText}>Reminder?</span>
                    }
                  />
                </FormGroup>
              </div>
            )}
          </div>
        </div>
        <div style={{ width: '50%' }}>
          <div style={{ margin: '30px 0 20px' }}>
            <span className={classes.subTitle}>Who can see this step?</span>
            <RadioGroup
              aria-label="share"
              name="share"
              value={step.share.whoCanSee}
              style={{ margin: '10px 0', paddingLeft: '10px' }}>
              <FormControlLabel
                value="Network"
                control={<Radio color="primary" />}
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <People style={{ marginRight: '10px' }} />
                    <span className={classes.shareText}>
                      Everyone in my network
                    </span>
                  </div>
                }
              />
              <FormControlLabel
                value="OnlyMe"
                control={<Radio color="primary" />}
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <Lock style={{ marginRight: '10px' }} />
                    <span className={classes.shareText}>Only me</span>
                  </div>
                }
              />
              <FormControlLabel
                value="SpecificPeople"
                control={<Radio color="primary" />}
                label={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <PersonPin style={{ marginRight: '10px' }} />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                      <span className={classes.shareText}>
                        Specific people or services...
                      </span>
                      {step.share.network.length === 1 && (
                        <div className={classes.selectedNetwork}>
                          {step.share.network[0].Name}...
                        </div>
                      )}
                      {step.share.network.length >= 2 && (
                        <div className={classes.selectedNetwork}>
                          {step.share.network[0].Name},
                          {step.share.network[1].Name}...
                        </div>
                      )}
                    </div>
                    <KeyboardArrowRight
                      fontSize="large"
                      style={{
                        marginLeft: '1px',
                        fill: '#73BA9B'
                      }}
                    />
                  </div>
                }
              />
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepList;
