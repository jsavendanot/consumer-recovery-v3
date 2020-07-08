import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { Goal } from 'types/goal';
import { makeStyles } from '@material-ui/styles';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { Network } from 'types/network';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { SubmitConfirmation } from 'common/components';
import { IconButton } from '@material-ui/core';
import {
  acceptGoalSuggestion,
  rejectGoalSuggestion
} from 'slices/suggestion/goal/action';

const useStyles = makeStyles(() => ({
  suggestText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  },
  createdBy: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B3B3B3'
  },
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

export const Suggest: React.FC<Props> = ({ goal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  const [actionType, setActionType] = useState('');

  /** Dialog */
  const [open, setOpen] = useState(false);

  const openDialog = (action: string) => {
    setActionType(action);
    setOpen(true);
  };

  function closeDialog() {
    setOpen(false);
    setActionType('');
  }

  const approveSuggestion = () => {
    if (goal.SuggestionId) {
      dispatch(acceptGoalSuggestion(history, goal.SuggestionId));
    }
  };

  const rejectSuggestion = () => {
    if (goal.SuggestionId) {
      dispatch(rejectGoalSuggestion(history, goal.SuggestionId));
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px'
        }}>
        <div className={classes.createdBy}>
          Created by{' '}
          {networks.find(item => item.UserId === goal.SuggestedByUserId)?.Name}
        </div>
        <IconButton onClick={() => openDialog('reject')}>
          <Cancel style={{ fill: '#FF743E' }} fontSize="large" />
        </IconButton>
        <IconButton onClick={() => openDialog('accept')}>
          <CheckCircle
            style={{
              fill: '#90E43B'
            }}
            fontSize="large"
          />
        </IconButton>
      </div>
      {open && (
        <SubmitConfirmation
          open={open}
          close={closeDialog}
          action={
            actionType === 'accept' ? approveSuggestion : rejectSuggestion
          }
          donRedirect>
          {actionType === 'accept' ? (
            <span className={classes.title}>
              This goal will become yours
              <br />
              when you approve.
            </span>
          ) : (
            <span className={classes.title}>
              Are you sure you want to decline
              <br />
              this goal suggestion
            </span>
          )}
        </SubmitConfirmation>
      )}
    </>
  );
};

export default Suggest;
