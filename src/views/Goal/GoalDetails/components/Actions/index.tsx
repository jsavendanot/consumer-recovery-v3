import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { removeGoal } from 'slices/goal/action';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { Goal } from 'types/goal';

import { DeleteConfirmation } from 'common/components';

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
  goal: Goal;
};

export const Actions: React.FC<Props> = ({ goal }) => {
  const classes = useStyles();
  const { history, location } = useRouter();
  const dispatch = useDispatch();

  const handleRemoveGoal = (goalId: string) => {
    dispatch(removeGoal(goalId));
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
    <>
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '10px'
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
      </Grid>
      {open && (
        <DeleteConfirmation
          open={open}
          close={handleClose}
          action={() => handleRemoveGoal(goal.Id)}>
          <span className={classes.title}>
            Are you sure you want to
            <br />
            delete this goal?
          </span>
        </DeleteConfirmation>
      )}
    </>
  );
};

export default Actions;
