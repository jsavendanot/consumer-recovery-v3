import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  circle: {
    width: '7.95px',
    height: '7.95px',
    borderRadius: '50%',
    margin: '8px',
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
    justifyContent: 'flex-end'
  },
  activeArrow: {
    fill: '#FFFFFF'
  },
  inActiveArrow: {
    fill: 'rgba(255, 255, 255, 0.4)'
  }
}));

type Props = {
  index: number;
  totalImagesLen: number;
  next: () => void;
  back: () => void;
};

const Navigation: React.FC<Props> = ({ next, back, index, totalImagesLen }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item xs={3} className={classes.arrowContainer}>
        <IconButton onClick={back}>
          <ArrowBackIos
            className={clsx(
              index > 0 && classes.activeArrow,
              index === 0 && classes.inActiveArrow
            )}
          />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <ul className={classes.ul}>
          {[0, 1, 2, 3, 4].map(index => {
            return (
              <li key={index}>
                <div className={classes.circle} />
              </li>
            );
          })}
        </ul>
      </Grid>
      <Grid item xs={3}>
        <IconButton onClick={next}>
          <ArrowForwardIos
            className={clsx(
              index < totalImagesLen && classes.activeArrow,
              index === totalImagesLen - 1 && classes.inActiveArrow
            )}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Navigation;
