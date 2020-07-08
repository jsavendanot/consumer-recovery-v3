import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  acceptStressMeSuggestion,
  rejectStressMeSuggestion
} from 'slices/suggestion/safety/stress/action';
import { IconButton } from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { Network } from 'types/network';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { Item } from 'types/safety';
import { SubmitConfirmation } from 'common/components';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0'
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0',
    padding: '0 45px'
  },
  row: {
    width: '100%',
    background: '#FFFAE9',
    borderRadius: '4px',
    padding: '10px'
  },
  rowSuggested: {
    width: '100%',
    background: '#FFFAE9',
    borderRadius: '4px',
    padding: '10px'
  },
  strengthName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  suggestedStrengthName: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '127.69%',
    color: '#C57D7D'
  },
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
  }
}));

type Props = {
  item: Item;
};
export const SuggestedItem: React.FC<Props> = ({ item }) => {
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
      dispatch(acceptStressMeSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  const rejectSuggestion = () => {
    if (selectedSuggestionId.length > 0) {
      dispatch(rejectStressMeSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  return (
    <>
      <div className={classes.rowContainer}>
        <div className={classes.rowSuggested}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <span className={classes.suggestedStrengthName}>{item.name}</span>
            <div className={classes.iconContainer}>
              <IconButton
                onClick={() => openDialog('reject', item.SuggestionId!)}>
                <Cancel style={{ fill: '#FF743E' }} fontSize="large" />
              </IconButton>
              <IconButton
                onClick={() => openDialog('accept', item.SuggestionId!)}>
                <CheckCircle
                  style={{
                    fill: '#90E43B'
                  }}
                  fontSize="large"
                />
              </IconButton>
            </div>
          </div>
          <div className={classes.createdBy}>
            Created by{' '}
            {
              networks.find(
                network => network.UserId === item.SuggestedByUserId
              )?.Name
            }
          </div>
        </div>
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
              This stress me will become yours
              <br />
              when you approve.
            </span>
          ) : (
            <span className={classes.title}>
              Are you sure you want to decline
              <br />
              this stress me suggestion
            </span>
          )}
        </SubmitConfirmation>
      )}
    </>
  );
};

export default SuggestedItem;
