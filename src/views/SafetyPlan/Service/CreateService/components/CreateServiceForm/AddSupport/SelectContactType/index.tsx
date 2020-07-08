import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px',
    borderBottom: '1px solid #73BA9B',
    marginBottom: '10px'
  },
  headerText: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#73BA9B'
  },
  closeIcon: {
    padding: '0'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px'
  },
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    textTransform: 'capitalize'
  },
  button: {
    background: '#FFFFFF',
    border: '1.5px solid #003E1F',
    boxSizing: 'border-box',
    borderRadius: '25px',
    padding: '10px 10px',
    width: '100%'
  }
}));

type Props = {
  close: () => void;
  clickNumber: () => void;
  openSuggestion: () => void;
};

const SelectContactType: React.FC<Props> = ({
  clickNumber,
  openSuggestion,
  close
}) => {
  const classes = useStyles();

  const handeClickNetwork = () => {
    close();
    openSuggestion();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.header}>
          <span className={classes.headerText}>Insert contact number</span>
          <IconButton className={classes.closeIcon} onClick={close}>
            <Close fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.container}>
          <Button className={classes.button} onClick={clickNumber}>
            <span className={classes.text}>Enter Phone Number</span>
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.container}>
          <Button className={classes.button} onClick={handeClickNetwork}>
            <span className={classes.text}>Pick from Network</span>
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.container} onClick={close}>
          <span className={classes.text}>Cancel</span>
        </div>
      </Grid>
    </Grid>
  );
};

export default SelectContactType;
