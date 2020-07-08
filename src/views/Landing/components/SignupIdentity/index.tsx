import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#73ba9b',
    marginTop: '20px'
  },
  text1: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#003e1f'
  },
  text2: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#003e1f'
  },
  text3: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#4D3826'
  },
  line: {
    width: '80%',
    borderBottom: '1px solid #73ba9b',
    paddingTop: '10px'
  },
  footerText1: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#73ba9b'
  },
  footerText2: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '19px',
    color: '#003e1f',
    marginBottom: '20px'
  }
}));

type Props = {
  click: () => void;
};

const SignupIdentity: React.FC<Props> = ({ click }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={1}>
        <Grid
          item
          xs={12}
          className={clsx(classes.flexContainer, classes.title)}>
          Create account
        </Grid>
        <Grid
          item
          xs={12}
          className={clsx(classes.flexContainer, classes.text1)}>
          choose your role
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={6} className={classes.flexContainer}>
              <img src="/images/landing/carer.svg" alt="" />
            </Grid>
            <Grid item xs={6} className={classes.flexContainer}>
              <img src="/images/landing/consumer.svg" alt="" onClick={click} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={6}>
              <div style={{ textAlign: 'center' }}>
                <span className={classes.text2}>
                  I want to access
                  <br />
                  someone's
                  <br />
                  recovery plan
                </span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: 'center' }}>
                <span className={classes.text3}>
                  I want to make
                  <br />a recovery plan
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.flexContainer}>
          <div className={classes.line} />
        </Grid>
        <Grid item xs={12} className={classes.flexContainer}>
          <span className={classes.footerText1}>Already have an account?</span>
        </Grid>
        <Grid item xs={12} className={classes.flexContainer}>
          <span className={classes.footerText2}>Log in</span>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupIdentity;
