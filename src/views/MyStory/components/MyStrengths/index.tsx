import React, { useState } from 'react';
import { Strength } from 'types/story';

import { makeStyles } from '@material-ui/styles';
import { Cancel, CheckCircle } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { IconButton } from '@material-ui/core';
import { Network } from 'types/network';
import {
  acceptStrengthSuggestion,
  rejectStrengthSuggestion
} from 'slices/suggestion/story/action';
import { SubmitConfirmation } from 'common/components';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0'
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0'
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
  strengths: Strength[];
};

const MyStrengths: React.FC<Props> = ({ strengths }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const suggestedStrengths: Strength[] = useSelector(
    (state: RootState) => state.suggestion.strengths
  );

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
      dispatch(acceptStrengthSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  const rejectSuggestion = () => {
    if (selectedSuggestionId.length > 0) {
      dispatch(rejectStrengthSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  return (
    <>
      <div className={classes.root}>
        {strengths.concat(suggestedStrengths).map(strength => {
          return (
            <div key={strength.id}>
              {!strength.SuggestionId ? (
                <div className={classes.rowContainer}>
                  <div className={classes.row}>
                    <span className={classes.strengthName}>
                      {strength.name}
                    </span>
                  </div>
                </div>
              ) : (
                <div className={classes.rowContainer}>
                  <div className={classes.rowSuggested}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                      <span className={classes.suggestedStrengthName}>
                        {strength.name}
                      </span>
                      <div className={classes.iconContainer}>
                        <IconButton
                          onClick={() =>
                            openDialog('reject', strength.SuggestionId!)
                          }>
                          <Cancel
                            style={{ fill: '#FF743E' }}
                            fontSize="large"
                          />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            openDialog('accept', strength.SuggestionId!)
                          }>
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
                          item => item.UserId === strength.SuggestedByUserId
                        )?.Name
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
              This strength will become yours
              <br />
              when you approve.
            </span>
          ) : (
            <span className={classes.title}>
              Are you sure you want to decline
              <br />
              this strength suggestion
            </span>
          )}
        </SubmitConfirmation>
      )}
    </>
  );
};

export default MyStrengths;
