import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
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
import { AccessGoals, AccessJournals } from './components';
import { Network } from 'types/network';

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
  accessState: {
    goal: boolean;
    journey: boolean;
    story: boolean;
    safety: boolean;
    network: boolean;
  };
  setAccessState: Dispatch<
    SetStateAction<{
      goal: boolean;
      journey: boolean;
      story: boolean;
      safety: boolean;
      network: boolean;
    }>
  >;
  network: Network;
};

const ManageAccess: React.FC<Props> = ({
  network,
  accessState,
  setAccessState
}) => {
  const classes = useStyles();

  const handleValues = (
    field: 'goal' | 'journey' | 'story' | 'safety' | 'network',
    value: boolean
  ) => {
    setAccessState(values => ({
      ...values,
      [field]: value
    }));
  };

  const [radioSelected, setRadioSelected] = useState<'all' | 'specific'>('all');
  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected(event.target.value as 'all' | 'specific');
  };

  const [radioSelected2, setRadioSelected2] = useState<'all' | 'specific'>(
    'all'
  );
  const handleRadioInput2 = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected2(event.target.value as 'all' | 'specific');
  };

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const specificGoals = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent>
        <AccessGoals network={network} close={handleClose} />
      </DialogContent>
    </Dialog>
  );

  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => {
    setOpen2(false);
  };

  const specificJournals = (
    <Dialog
      open={open2}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose2}>
      <DialogContent>
        <AccessJournals network={network} close={handleClose2} />
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
                  checked={accessState.goal}
                  color="primary"
                  edge="start"
                  name="goal"
                  onChange={() => handleValues('goal', !accessState.goal)}
                />
              </div>
              {accessState.goal && (
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
                  checked={accessState.journey}
                  color="primary"
                  edge="start"
                  name="journey"
                  onChange={() => handleValues('journey', !accessState.journey)}
                />
              </div>
              {accessState.journey && (
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
                        value="SpecificPeople"
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
                  checked={accessState.story}
                  color="primary"
                  edge="start"
                  name="story"
                  onChange={() => handleValues('story', !accessState.story)}
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
                  checked={accessState.safety}
                  color="primary"
                  edge="start"
                  name="safety"
                  onChange={() => handleValues('safety', !accessState.safety)}
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
                  checked={accessState.network}
                  color="primary"
                  edge="start"
                  name="network"
                  onChange={() => handleValues('network', !accessState.network)}
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

export default ManageAccess;
