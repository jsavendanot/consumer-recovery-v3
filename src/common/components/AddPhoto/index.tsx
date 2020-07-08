import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton, Input } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
    padding: '15px 20px'
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
  },
  input: {
    display: 'none'
  }
}));

type Props = {
  close: () => void;
};

const AddPhoto: React.FC<Props> = ({ close }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.header}>
          <span className={classes.headerText}>Add photo?</span>
          <IconButton className={classes.closeIcon} onClick={close}>
            <CloseIcon fontSize="large" style={{ fill: '#73BA9B' }} />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.container}>
          <Input
            // accept="image/*"
            className={classes.input}
            id="icon-button-photo"
            type="file"
          />
          <label htmlFor="icon-button-photo" style={{ width: '100%' }}>
            <Button className={classes.button} component="span">
              <span className={classes.text}>Upload photo</span>
            </Button>
          </label>
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

export default AddPhoto;
