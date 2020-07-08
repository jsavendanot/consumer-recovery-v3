import React, { useState, ChangeEvent } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Grid,
  Switch,
  Theme,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  useMediaQuery,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';
import { Invitation } from 'types/network';
import { AccessJournals, AccessGoals } from './components';
import { Journal } from 'types/journey';
import { Goal } from 'types/goal';

const useStyles = makeStyles(() => ({
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#73BA9B'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px 20px'
  },
  subContainer: {
    flexGrow: 1,
    textAlign: 'left'
  },
  divider: {
    border: '1px solid #73BA9B'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    lineHeight: '26px',
    color: '#37474F'
  },
  text: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#37474F'
  },
  item: {
    margin: '10px 0'
  },
  arrow: {
    fill: '#73BA9B',
    marginRight: '20px',
    cursor: 'pointer'
  }
}));

type Props = {
  invitation: Invitation;
  changeHandler: (name: string, value: string | boolean) => void;
};

const SendAccess: React.FC<Props> = ({ invitation, changeHandler }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    goal: false,
    journey: false
  });

  const handleValues = (field: 'goal' | 'journey', value: boolean) => {
    setValues(values => ({
      ...values,
      [field]: value
    }));

    if (field === 'goal' && value) {
      changeHandler('ShareAllGoals', true);
      setRadioSelected('all');
    } else if (field === 'goal' && !value) {
      changeHandler('ShareAllGoals', false);
      changeHandler('GoalsToShare', '');
    }

    if (field === 'journey' && value) {
      changeHandler('ShareAllJournals', true);
      setRadioSelected2('all');
    } else if (field === 'journey' && !value) {
      changeHandler('ShareAllJournals', false);
      changeHandler('JournalsToShare', '');
    }
  };

  const [radioSelected, setRadioSelected] = useState<'all' | 'specific'>('all');
  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected(event.target.value as 'all' | 'specific');
    if (event.target.value === 'all') {
      changeHandler('ShareAllGoals', true);
      changeHandler('GoalsToShare', '');
    } else if (event.target.value === 'specific') {
      changeHandler('ShareAllGoals', false);
    }
  };

  const [radioSelected2, setRadioSelected2] = useState<'all' | 'specific'>(
    'all'
  );
  const handleRadioInput2 = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected2(event.target.value as 'all' | 'specific');
    if (event.target.value === 'all') {
      changeHandler('ShareAllJournals', true);
      changeHandler('JournalsToShare', '');
    } else if (event.target.value === 'specific') {
      changeHandler('ShareAllJournals', false);
    }
  };

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const goalsCallback = (goals: Goal[]) => {
    const selectedGoals = goals.map(item => {
      return item.Id;
    });
    changeHandler('GoalsToShare', selectedGoals.join(','));
  };

  const specificGoals = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={() => setOpen(false)}>
      <DialogContent>
        <AccessGoals close={() => setOpen(false)} callBback={goalsCallback} />
      </DialogContent>
    </Dialog>
  );

  const [open2, setOpen2] = useState(false);

  const journalsCallback = (journals: Journal[]) => {
    const selectedJournals = journals.map(item => {
      return item.Id;
    });
    changeHandler('JournalsToShare', selectedJournals.join(','));
  };

  const specificJournals = (
    <Dialog
      open={open2}
      keepMounted
      fullScreen={fullScreen}
      onClose={() => setOpen2(false)}>
      <DialogContent>
        <AccessJournals
          close={() => setOpen2(false)}
          callBback={journalsCallback}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.flexContainer}>
          <div className={classes.subContainer}>
            <span className={classes.label}>Can access</span>
          </div>
        </div>
        <div style={{ padding: '0 20px' }}>
          <Divider className={classes.divider} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container style={{ marginTop: '20px' }}>
          <Grid item xs={12} className={classes.item}>
            <div style={{ margin: '0 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <span className={classes.title}>My goals</span>
                <Switch
                  checked={values.goal}
                  color="primary"
                  edge="start"
                  name="goal"
                  onChange={() => handleValues('goal', !values.goal)}
                />
              </div>
              {values.goal && (
                <div>
                  <RadioGroup
                    aria-label="share"
                    name="share"
                    style={{ margin: '10px 0', paddingLeft: '10px' }}
                    value={radioSelected}
                    onChange={event => handleRadioInput(event)}>
                    <FormControlLabel
                      value="all"
                      control={<Radio color="primary" />}
                      label={<span className={classes.text}>All goals</span>}
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onClick={() => setOpen(true)}>
                      <FormControlLabel
                        value="specific"
                        control={<Radio color="primary" />}
                        label={
                          <span className={classes.text}>
                            Specific goals and steps...
                          </span>
                        }
                      />
                      <ArrowForwardIos className={classes.arrow} />
                    </div>
                  </RadioGroup>
                </div>
              )}
              <Divider className={classes.divider} />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <div style={{ margin: '0 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <span className={classes.title}>My journey</span>
                <Switch
                  checked={values.journey}
                  color="primary"
                  edge="start"
                  name="journey"
                  onChange={() => handleValues('journey', !values.journey)}
                />
              </div>
              {values.journey && (
                <div>
                  <RadioGroup
                    aria-label="share"
                    name="share"
                    style={{ margin: '10px 0', paddingLeft: '10px' }}
                    value={radioSelected2}
                    onChange={event => handleRadioInput2(event)}>
                    <FormControlLabel
                      value="all"
                      control={<Radio color="primary" />}
                      label={<span className={classes.text}>All journey</span>}
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onClick={() => setOpen2(true)}>
                      <FormControlLabel
                        value="specific"
                        control={<Radio color="primary" />}
                        label={
                          <span className={classes.text}>
                            Specific journey...
                          </span>
                        }
                      />
                      <ArrowForwardIos className={classes.arrow} />
                    </div>
                  </RadioGroup>
                </div>
              )}
              <Divider className={classes.divider} />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <div style={{ margin: '0 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <span className={classes.title}>My story</span>
                <Switch
                  checked={invitation.ShareMyStory}
                  color="primary"
                  edge="start"
                  name="story"
                  onChange={() =>
                    changeHandler('ShareMyStory', !invitation.ShareMyStory)
                  }
                />
              </div>
              <Divider className={classes.divider} />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <div style={{ margin: '0 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <span className={classes.title}>My safety plan</span>
                <Switch
                  checked={invitation.ShareSafetyPlan}
                  color="primary"
                  edge="start"
                  name="safety"
                  onChange={() =>
                    changeHandler(
                      'ShareSafetyPlan',
                      !invitation.ShareSafetyPlan
                    )
                  }
                />
              </div>
              <Divider className={classes.divider} />
            </div>
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <div style={{ margin: '0 20px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <span className={classes.title}>My network</span>
                <Switch
                  checked={invitation.ShareNetworkContacts}
                  color="primary"
                  edge="start"
                  name="network"
                  onChange={() =>
                    changeHandler(
                      'ShareNetworkContacts',
                      !invitation.ShareNetworkContacts
                    )
                  }
                />
              </div>
              <Divider className={classes.divider} />
            </div>
          </Grid>
        </Grid>
      </Grid>
      {open && specificGoals}
      {open2 && specificJournals}
    </Grid>
  );
};

export default SendAccess;
