import React from 'react';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'common/utils/useRouter';
import { Dialog, DialogContent, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
    color: '#73BA9B'
  },
  buttonContainer: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-around'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F',
    cursor: 'pointer'
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
    borderRadius: '25px'
  }
}));

type Props = {
  open: boolean;
  close: () => void;
  action: () => void;
  redirect?: boolean;
};

const YesNoConfirmation: React.FC<Props> = ({
  open,
  close,
  action,
  children,
  redirect
}) => {
  const classes = useStyles();
  const { history } = useRouter();

  const handleAction = () => {
    action();
    close();
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <div className={classes.root}>
          {children}
          <div className={classes.buttonContainer}>
            <span
              className={classes.cancelText}
              onClick={redirect ? () => history.goBack() : close}>
              No
            </span>
            <Button className={classes.submitButton} onClick={handleAction}>
              <span className={classes.submitText}>Yes</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YesNoConfirmation;
