import React, { useContext, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  FormControlLabel,
  RadioGroup,
  Radio,
  Theme,
  useMediaQuery,
  Dialog,
  DialogContent
} from '@material-ui/core';
import {
  People,
  Lock,
  PersonPin,
  KeyboardArrowRight
} from '@material-ui/icons';
import JournalContext from '../../..//JournalContext';
import { NetworkList } from 'common/components';
import { Network } from 'types/network';

const useStyles = makeStyles((theme: Theme) => ({
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003E1F',
    margin: '5px 0'
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

export const Share: React.FC = () => {
  const classes = useStyles();
  const { journal, setJournal } = useContext(JournalContext);

  const handleJournalField = (field: string, value: string | boolean) => {
    if (field === 'whoCanSee' && (value === 'Network' || value === 'OnlyMe')) {
      setJournal(values => ({
        ...values,
        share: {
          ...values['share'],
          [field]: value,
          network: []
        }
      }));
    }
  };

  /** Select specific network dialog */
  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleNetworkCallBack = (networks: Network[]) => {
    if (networks.length > 0) {
      setJournal(value => ({
        ...value,
        share: {
          ...value.share,
          whoCanSee: 'SpecificPeople',
          network: networks
        }
      }));
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
    <div style={{ margin: '30px 0' }}>
      <span className={classes.subTitle}>Share this journal with</span>
      <RadioGroup
        aria-label="share"
        name="share"
        style={{ margin: '10px 0', paddingLeft: '10px' }}
        value={journal.share.whoCanSee}
        onChange={event => handleJournalField('whoCanSee', event.target.value)}>
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
              <span>Everyone in my network</span>
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
              <span>Only me</span>
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
                <span>Specific people or services</span>
                {journal.share.network.length === 1 && (
                  <div className={classes.selectedNetwork}>
                    {journal.share.network[0].Name}...
                  </div>
                )}
                {journal.share.network.length >= 2 && (
                  <div className={classes.selectedNetwork}>
                    {journal.share.network[0].Name},
                    {journal.share.network[1].Name}...
                  </div>
                )}
              </div>
              <KeyboardArrowRight
                fontSize="large"
                style={{ marginLeft: '1px', fill: '#73BA9B' }}
              />
            </div>
          }
        />
      </RadioGroup>
      {open && networkListDialog}
    </div>
  );
};

export default Share;
