import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '40px',
    height: '143px'
  },
  arrowContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  textActive: {
    cursor: 'pointer',
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '22px',
    marginTop: '10px',
    color: '#FFFFFF'
  },
  textInactive: {
    cursor: 'pointer',
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '22px',
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: '10px'
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
  back: () => void;
  done: () => void;
  active: boolean;
};

const Navigation: React.FC<Props> = ({ back, done, active }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <div className={classes.arrowContainer}>
            <span className={classes.textActive} onClick={back}>
              Cancel
            </span>
          </div>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={3}>
          <div className={classes.arrowContainer}>
            <span
              className={clsx(
                !active && classes.textInactive,
                active && classes.textActive
              )}
              onClick={done}>
              Done
            </span>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Navigation;
