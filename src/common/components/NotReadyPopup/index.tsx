import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogContent,
  Button,
  Theme,
  Hidden
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '450px'
    }
  },
  body: {
    display: 'flex'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '35px',
    color: '#73BA9B',
    marginBottom: '20px'
  },
  bodyText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '23px',
    color: '#323F45',
    marginBottom: '20px'
  },
  submitText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#FFFFFF'
  },
  submitButton: {
    background: '#F79221',
    borderRadius: '25px',
    marginBottom: '10px'
  },
  image: {
    width: '150px',
    height: '200px',
    [theme.breakpoints.up('sm')]: {
      width: '200px',
      height: '300px'
    },
    [theme.breakpoints.up('lg')]: {
      width: '200px',
      height: '300px'
    }
  }
}));

type Props = {
  open: boolean;
  close: () => void;
};

const NotReadyPopup: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <Hidden smUp>
          <div className={classes.title}>
            Oh no!
            <br />
            This feature is not
            <br />
            ready yet.
          </div>
        </Hidden>
        <div className={classes.root}>
          <div>
            <Hidden xsDown>
              <div className={classes.title}>
                Oh no!
                <br />
                This feature is not
                <br />
                ready yet.
              </div>
            </Hidden>
            <div className={classes.bodyText}>
              The team at Jiemba is
              <br />
              working hard to make this
              <br />
              feature available soon.
            </div>
            <Button className={classes.submitButton} onClick={close}>
              <span className={classes.submitText}>Close</span>
            </Button>
          </div>
          <img
            src="/images/error/not-ready-icon.svg"
            alt=""
            className={classes.image}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotReadyPopup;
