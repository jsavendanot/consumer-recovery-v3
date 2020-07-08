import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { endSession } from 'slices/auth/action';
import { DialogContent, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  warningText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '18px',
    color: '#73BA9B'
  }
}));

const LogoutPopup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const signoutTime = useRef<number>(21 * 60000);
  const warningTime = useRef<number>(20 * 60000); // 20 minutes

  const warnTimeout = useRef<any>();
  const logoutTimeout = useRef<any>();

  const setTimeouts = useCallback(() => {
    const warn = () => {
      openDialog();
    };

    const logout = () => {
      dispatch(endSession());
    };

    warnTimeout.current = setTimeout(warn, warningTime.current);
    logoutTimeout.current = setTimeout(logout, signoutTime.current);
  }, [dispatch]);

  const clearTimeouts = useCallback(() => {
    if (warnTimeout.current) clearTimeout(warnTimeout.current);
    if (logoutTimeout.current) clearTimeout(logoutTimeout.current);
  }, []);

  useEffect(() => {
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
    };

    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }

    setTimeouts();
    return () => {
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
        clearTimeouts();
      }
    };
  }, [clearTimeouts, setTimeouts]);

  /** Dialog */
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  const openDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent>
          <span className={classes.warningText}>
            You will be logged out automatically in 1 minute.
          </span>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default LogoutPopup;
