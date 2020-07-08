import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: 48,
    height: 48,
    margin: '10px'
  },
  circle1: {
    stroke: 'rgba(0,0,0,0.05)',
    fill: 'none',
    strokeWidth: 4
  },
  circle2: {
    stroke: 'rgba(115, 186, 155, 0.5)',
    fill: 'none',
    strokeWidth: 4,
    animation: '$progress 1s ease-out forwards'
  },
  '@keyframes progress': {
    '0%': {
      strokeDasharray: '0 100'
    }
  },
  circle2Active: {
    stroke: '#003E1F'
  }
}));

type Props = {
  value: number;
  active?: boolean;
};

const CircularProgress: React.FC<Props> = ({ value, active }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <svg viewBox="0 0 36 36">
        <path
          className={classes.circle1}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          strokeDasharray="100, 100"
        />
        <path
          className={clsx(classes.circle2, active && classes.circle2Active)}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          strokeDasharray={`${value}, 100`}
        />
      </svg>
    </div>
  );
};

export default CircularProgress;
