import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const baseStyle = {
  width: '100%',
  height: '50px',
  borderRadius: '25px',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '21px',
  cursor: 'pointer'
};

const baseAuthStyle = {
  width: '100%',
  height: '50px',
  borderRadius: '25px',
  fontFamily: 'Scada',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '30px',
  cursor: 'pointer'
};

const useStyles = makeStyles((theme: Theme) => ({
  primary: {
    ...baseStyle,
    boxSizing: 'border-box',
    border: 'none',
    color: '#FFFFFF',
    backgroundColor: '#003E1F',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#076A38'
    },
    '&:active': {
      backgroundColor: '#076A38'
    }
  },
  secondary: {
    ...baseStyle,
    boxSizing: 'border-box',
    border: '1.5px solid #003E1F',
    color: '#003E1F',
    backgroundColor: '#FFFFFF',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#ECEFF0'
    },
    '&:active': {
      backgroundColor: '#003E1F'
    }
  },
  extra: {
    ...baseStyle,
    boxSizing: 'border-box',
    border: 'none',
    color: '#FFFFFF',
    backgroundColor: '#003E1F',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#076A38'
    },
    '&:active': {
      backgroundColor: '#076A38'
    }
  },
  consumer: {
    ...baseAuthStyle,
    boxSizing: 'border-box',
    border: '2px solid #FFFFFF',
    color: '#FFFFFF',
    backgroundColor: '#73BA9B',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#73BA9B'
    },
    '&:active': {
      backgroundColor: '#73BA9B'
    }
  },
  carer: {
    ...baseAuthStyle,
    border: '2px solid #FFFFFF',
    color: '#FFFFFF',
    backgroundColor: '#85BFFF',
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: '#85BFFF'
    },
    '&:active': {
      backgroundColor: '#85BFFF'
    }
  }
}));

type Props = {
  children: React.ReactNode;
  click?: () => void;
  type: 'primary' | 'secondary' | 'extra' | 'consumer' | 'carer';
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ children, click, type, disabled }) => {
  const classes = useStyles();
  let classType = '';
  if (type === 'primary') {
    classType = classes.primary;
  } else if (type === 'secondary') {
    classType = classes.secondary;
  } else if (type === 'extra') {
    classType = classes.extra;
  } else if (type === 'consumer') {
    classType = classes.consumer;
  } else if (type === 'carer') {
    classType = classes.carer;
  }
  return disabled ? (
    <button className={classType}>{children}</button>
  ) : (
    <button className={classType} onClick={click}>
      {children}
    </button>
  );
};

export default Button;
