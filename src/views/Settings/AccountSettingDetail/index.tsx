import React, { useState } from 'react';
import { Slide, Grid, IconButton, Theme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ArrowBackIos } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteAccountData } from 'slices/settings/action';
import { SubmitConfirmation } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#73BA9B',
    marginBottom: '20px'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    marginBottom: '10px',
    textAlign: 'justify',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  description: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F',
    textAlign: 'justify',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    border: 'none',
    color: '#F79221',
    textTransform: 'none',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#FFFFFF'
  },
  navigation: {
    marginLeft: '20px'
  },
  buttonContainer: {
    marginTop: '20px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

type Props = {
  notificationType: 'AccountReset' | '';
  settingName: string;
  back: () => void;
};
export const AccountSettingDetail: React.FC<Props> = ({
  notificationType,
  settingName,
  back
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(deleteAccountData());
  };

  /** Dialog */
  const [open, setOpen] = useState(false);

  const confirmDialog = (
    <SubmitConfirmation
      open={open}
      close={() => setOpen(false)}
      action={clickHandler}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure that you want to
        <br />
        clear all stored data?
        <br />
        This action cannot be undone.
        <br />
        We will log you out after this.
      </span>
    </SubmitConfirmation>
  );

  return (
    <Slide
      direction="left"
      in={notificationType !== ''}
      mountOnEnter
      unmountOnExit>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={2} container justify="center">
          <IconButton onClick={back}>
            <ArrowBackIos style={{ fill: '#73BA9B' }} fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={10} container>
          <Grid item xs={12}>
            <div className={classes.title}>{settingName}</div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.subTitle}>
              Clear all stored data from your device and Jiemba’s server
            </div>
            <div className={classes.description}>
              Any data you generate will be wiped out irretrievably from your
              device and the server. You can still use your current email
              address and password to log in but everything will start from
              scratch.
            </div>
            <div className={classes.buttonContainer}>
              <Button className={classes.button} onClick={() => setOpen(true)}>
                Clear all stored data
              </Button>
            </div>
          </Grid>
        </Grid>
        {open && confirmDialog}
      </Grid>
    </Slide>
  );
};

export default AccountSettingDetail;
