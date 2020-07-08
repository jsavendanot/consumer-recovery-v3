import React, { useState } from 'react';
import clsx from 'clsx';
import { Show, Edit } from './components';
import { Dialog, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  showDialogContent: {
    maxWidth: '440px',
    backgroundColor: '#D5F2E3',
    '&.MuiDialogContent-root:first-child': {
      padding: '20px 0 20px'
    }
  },
  editDialogContent: {
    maxWidth: '440px',
    backgroundColor: '#FFFFFF',
    '&.MuiDialogContent-root:first-child': {
      padding: '0'
    }
  }
}));

type Props = {
  open: boolean;
  close: () => void;
};

const Emergency: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent
        className={clsx(
          edit ? classes.editDialogContent : classes.showDialogContent
        )}>
        {edit ? (
          <Edit close={close} setEdit={setEdit} />
        ) : (
          <Show close={close} setEdit={setEdit} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Emergency;
