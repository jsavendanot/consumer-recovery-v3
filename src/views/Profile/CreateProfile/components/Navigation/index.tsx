import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Theme } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: '40px',
    height: '143px'
  },
  circle: {
    width: '7.95px',
    height: '7.95px',
    borderRadius: '50%',
    margin: '8px',
    background: 'rgba(255, 255, 255, 0.4)'
  },
  current: {
    background: '#FFFFFF'
  },
  ul: {
    padding: '0',
    margin: '0',
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center'
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
  activeText: {
    cursor: 'pointer',
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '22px',
    color: '#FFFFFF',
    [theme.breakpoints.up('md')]: {
      fontSize: '30px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '35px'
    }
  },
  inActiveText: {
    cursor: 'pointer',
    fontFamily: 'Tajawal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '22px',
    color: 'rgba(255, 255, 255, 0.4)',
    [theme.breakpoints.up('md')]: {
      fontSize: '30px'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '35px'
    }
  }
}));

type Props = {
  current: number;
  active: boolean;
  next: () => void;
  back: () => void;
};

const Navigation: React.FC<Props> = ({ current, active, next, back }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={3}>
        <div className={classes.arrowContainer}>
          <IconButton onClick={back} style={{ padding: '0' }}>
            <ArrowBackIos className={classes.backArrow} />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={6}>
        <ul className={classes.ul}>
          {[0, 1, 2, 3, 4].map(index => {
            return (
              <li key={index}>
                {index === current ? (
                  <div className={clsx(classes.circle, classes.current)} />
                ) : (
                  <div className={classes.circle} />
                )}
              </li>
            );
          })}
        </ul>
      </Grid>
      <Grid item xs={3}>
        <div className={classes.arrowContainer}>
          {current < 4 && (
            <span
              className={clsx(
                active ? classes.activeText : classes.inActiveText
              )}
              onClick={next}>
              Next
            </span>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Navigation;
