import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Card } from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { Network } from 'types/network';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { Unwell } from 'types/safety';
import {
  acceptUnwellSuggestion,
  rejectUnwellSuggestion
} from 'slices/suggestion/safety/unwell/action';
import { SubmitConfirmation } from 'common/components';

const useStyles = makeStyles(() => ({
  iconContainer: {
    display: 'flex'
  },
  createdBy: {
    width: '100%',
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
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '10px'
  },
  subContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  unwellName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#C57D7D'
  }
}));

type Props = {
  unwell: Unwell;
};
export const SuggestedItem: React.FC<Props> = ({ unwell }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const networks: Network[] = useSelector(
    (state: RootState) => state.networkRoot.network.networks
  );

  const [actionType, setActionType] = useState('');
  const [selectedSuggestionId, setSelectedSuggestionId] = useState('');

  /** Dialog */
  const [open, setOpen] = useState(false);

  const openDialog = (action: string, suggestionId: string) => {
    setActionType(action);
    setSelectedSuggestionId(suggestionId);
    setOpen(true);
  };

  function closeDialog() {
    setOpen(false);
    setActionType('');
    setSelectedSuggestionId('');
  }

  const approveSuggestion = () => {
    if (selectedSuggestionId.length > 0) {
      dispatch(acceptUnwellSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  const rejectSuggestion = () => {
    if (selectedSuggestionId.length > 0) {
      dispatch(rejectUnwellSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  return (
    <>
      <Card style={{ marginTop: '20px' }}>
        <div className={classes.container}>
          <div className={classes.subContainer}>
            <span className={classes.unwellName}>{unwell.Description}</span>
          </div>
          <div className={classes.subContainer}>
            <div className={classes.createdBy}>
              Created by{' '}
              {
                networks.find(
                  network => network.UserId === unwell.SuggestedByUserId
                )?.Name
              }
            </div>
            <div className={classes.iconContainer}>
              <IconButton
                onClick={() => openDialog('reject', unwell.SuggestionId!)}>
                <Cancel style={{ fill: '#FF743E' }} fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => openDialog('accept', unwell.SuggestionId!)}>
                <CheckCircle
                  style={{
                    fill: '#90E43B'
                  }}
                  fontSize="large"
                />
              </IconButton>
            </div>
          </div>
        </div>
      </Card>
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
              This unwell will become yours
              <br />
              when you approve.
            </span>
          ) : (
            <span className={classes.title}>
              Are you sure you want to decline
              <br />
              this unwell suggestion
            </span>
          )}
        </SubmitConfirmation>
      )}
    </>
  );
};

export default SuggestedItem;
