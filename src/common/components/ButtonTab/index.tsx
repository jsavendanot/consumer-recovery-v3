import React from 'react';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  tabTextActive: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '13px',
    lineHeight: '15px',
    color: '#37474F',
    textTransform: 'capitalize'
  },
  tabText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '15px',
    color: 'rgba(55, 71, 79, 0.4)',
    textTransform: 'capitalize'
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    // width: '50%',
    height: 33,
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#FFFFFF'
    },
    '&:active': {
      backgroundColor: '#FFFFFF'
    }
  },
  tabButton: {
    borderRadius: '20px',
    // width: '50%',
    height: 33
  }
}));

type Props = {
  name: string;
  active: boolean;
  click: () => void;
  className: string;
};
export const ButtonTab: React.FC<Props> = ({
  name,
  active,
  click,
  className
}) => {
  const classes = useStyles();
  return (
    <Button
      className={clsx(
        active && classes.tabButtonActive,
        !active && classes.tabButton,
        className
      )}
      onClick={click}>
      <span
        className={clsx(
          active && classes.tabTextActive,
          !active && classes.tabText
        )}>
        {name}
      </span>
    </Button>
  );
};

export default ButtonTab;
