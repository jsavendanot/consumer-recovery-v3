import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { removeJournal } from 'slices/journey/action';

import { makeStyles } from '@material-ui/styles';
import { Edit, Delete } from '@material-ui/icons';
import { Journal } from 'types/journey';

import { DeleteConfirmation } from 'common/components';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

type Props = {
  journal: Journal;
};

export const Actions: React.FC<Props> = ({ journal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history, location } = useRouter();

  const handleRemoveJournal = (journalId: string) => {
    dispatch(removeJournal(journalId));
  };

  const handleEdit = () => {
    history.push(`${location.pathname}/edit`);
  };

  /** Dialog */
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '20px 0'
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '30px',
          cursor: 'pointer'
        }}
        onClick={handleEdit}>
        <IconButton>
          <Edit style={{ fill: '#73BA9B' }} />
        </IconButton>
        <span className={classes.title}>Edit</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={handleClickOpen}>
        <IconButton>
          <Delete style={{ fill: '#73BA9B' }} />
        </IconButton>
        <span className={classes.title}>Delete</span>
      </div>
      {open && (
        <DeleteConfirmation
          open={open}
          close={handleClose}
          action={() => handleRemoveJournal(journal.Id)}>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            delete this journal?
          </span>
        </DeleteConfirmation>
      )}
    </div>
  );
};

export default Actions;
