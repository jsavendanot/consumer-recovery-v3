import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Theme } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '40px',
    [theme.breakpoints.up('xs')]: {
      height: '100px'
    },
    [theme.breakpoints.up('sm')]: {
      height: '100px'
    },
    [theme.breakpoints.up('md')]: {
      height: '40px'
    },
    [theme.breakpoints.up('lg')]: {
      height: '40px'
    }
  },
  arrowContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  backArrow: {
    fontSize: '38px',
    [theme.breakpoints.up('md')]: {
      fontSize: '50px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '50px'
    },
    fill: '#FFFFFF'
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
  }
}));

type Props = {
  save: () => void;
  back: () => void;
  active: boolean;
};

const Navigation: React.FC<Props> = ({ save, back, active }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item md={3} xl={3} xs={3}>
        <div className={classes.arrowContainer}>
          <IconButton onClick={back} style={{ padding: '0' }}>
            <ArrowBackIos className={classes.backArrow} />
          </IconButton>
        </div>
      </Grid>
      <Grid item md={6} xl={6} xs={6} />
      <Grid item md={3} xl={3} xs={3}>
        <div className={classes.arrowContainer}>
          <span
            className={clsx(
              !active && classes.textInactive,
              active && classes.textActive
            )}
            onClick={save}>
            Save
          </span>
        </div>
      </Grid>
    </Grid>
  );
};

export default Navigation;
