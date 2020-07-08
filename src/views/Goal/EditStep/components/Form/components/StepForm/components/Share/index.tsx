import React, { SetStateAction, Dispatch, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Dialog,
  Theme,
  useMediaQuery,
  DialogContent
} from '@material-ui/core';
import {
  People,
  Lock,
  PersonPin,
  KeyboardArrowRight
} from '@material-ui/icons';
import { StepForm } from 'types/goal';
import produce from 'immer';

import { Network } from 'types/network';
import { NetworkList } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      margin: '30px 0 20px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
      paddingLeft: '10px',
      display: 'flex',
      justifyContent: 'center'
    }
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
  shareText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
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
  step: StepForm;
  setStep: Dispatch<SetStateAction<StepForm>>;
};

export const Share: React.FC<Props> = ({ step, setStep }) => {
  const classes = useStyles();

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleStepField = (value: 'Network' | 'OnlyMe') => {
    if (value === 'Network' || value === 'OnlyMe') {
      setStep(
        produce((draft: StepForm) => {
          draft.share.whoCanSee = value;
          draft.share.network = [];
        })
      );
    }
  };

  const handleNetworkCallBack = (networks: Network[]) => {
    if (networks.length > 0) {
      setStep(
        produce((draft: StepForm) => {
          draft.share.network = networks;
          draft.share.whoCanSee = 'SpecificPeople';
        })
      );
    }
  };

  const networkListDialog = (
    <Dialog
      open={open}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClose}>
      <DialogContent>
        <NetworkList
          close={handleClose}
          callback={networks => handleNetworkCallBack(networks)}
          title="Sharing with specific people or services..."
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      <div style={{ margin: '30px 0 20px' }}>
        <span className={classes.subTitle}>Who can see this step?</span>
        <RadioGroup
          aria-label="share"
          name="share"
          value={step.share.whoCanSee}
          onChange={event =>
            handleStepField(event.target.value as 'Network' | 'OnlyMe')
          }
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
            onClick={() => setOpen(true)}
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
                      {step.share.network[0].Name},{step.share.network[1].Name}
                      ...
                    </div>
                  )}
                </div>
                <KeyboardArrowRight
                  fontSize="large"
                  style={{ marginLeft: '20px', fill: '#73BA9B' }}
                />
              </div>
            }
          />
        </RadioGroup>
      </div>
      {open && networkListDialog}
    </div>
  );
};

export default Share;
