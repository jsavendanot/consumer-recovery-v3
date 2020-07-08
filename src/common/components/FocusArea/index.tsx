import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    cursor: 'pointer'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    borderRadius: '12px',
    position: 'relative',
    textAlign: 'center'
  },
  boxTitle: {
    background: '#FFFFFF',
    // border: '1.5px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: '10px 5px',
    textAlign: 'center',
    position: 'relative',
    bottom: '0',
    width: '100%',
    marginTop: -4,
    height: 61,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#003E1F'
  },
  imageContainer: {
    // padding: '10px 0',
    boxSizing: 'border-box'
  },
  images: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '74%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    }
  }
}));

type Props = {
  id: string;
  name: string;
  color: string;
  image: string;
  click: (id: string) => void;
};

const FocusArea: React.FC<Props> = ({ id, name, color, image, click }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        className={classes.box}
        style={{ background: `${color}` }}
        onClick={() => click(id)}>
        <div className={classes.imageContainer}>
          <img className={classes.images} src={'/images/areas/' + image.toString()} alt="" />
        </div>
        <div className={classes.boxTitle}>
          <span className={classes.title}>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default FocusArea;
