import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Theme,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Network } from 'types/network';
import { RootState } from 'reducer';
import { Phone, Cancel, CheckCircle } from '@material-ui/icons';
import {
  acceptUnwellNoticeSuggestion,
  rejectUnwellNoticeSuggestion
} from 'slices/suggestion/safety/contact/action';
import { SubmitConfirmation } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    padding: '0'
  },
  flexLine: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
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
  subContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  number: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '25px',
    color: '#F79221'
  }
}));

type Props = {};
export const Organisations: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const organisations: Network[] = useSelector((state: RootState) =>
    state.safetyRoot.support.emergencyNetworks.filter(
      item => item.Type === 'Organisation'
    )
  );

  const suggestedOrgs: Network[] = useSelector(
    (state: RootState) => state.suggestion.organisations
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
      dispatch(acceptUnwellNoticeSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  const rejectSuggestion = () => {
    if (selectedSuggestionId.length > 0) {
      dispatch(rejectUnwellNoticeSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  return (
    <>
      <Card style={{ width: '100%' }}>
        <CardContent style={{ padding: '0' }}>
          <List className={classes.list}>
            {organisations.concat(suggestedOrgs).map((value, i) => (
              <ListItem key={i}>
                <ListItemText>
                  <Typography variant="body1" style={{ margin: '3px 0' }}>
                    {value.Name}
                  </Typography>
                  <div className={classes.flexLine}>
                    <Phone style={{ fill: '#F79221' }} />
                    <Typography variant="body1" style={{ color: '#F79221' }}>
                      <a
                        className={classes.number}
                        href={`tel:61${value.Phone}`}>
                        {value.Phone}
                      </a>
                    </Typography>
                  </div>
                  {value.SuggestionId && (
                    <div className={classes.subContainer}>
                      <div className={classes.createdBy}>
                        Created by{' '}
                        {
                          networks.find(
                            network =>
                              network.UserId === value.SuggestedByUserId
                          )?.Name
                        }
                      </div>
                      <div className={classes.iconContainer}>
                        <IconButton
                          onClick={() =>
                            openDialog('reject', value.SuggestionId!)
                          }>
                          <Cancel
                            style={{ fill: '#FF743E' }}
                            fontSize="large"
                          />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            openDialog('accept', value.SuggestionId!)
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
                  )}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </CardContent>
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
            <span className={classes.confirmTitle}>
              This contact will become yours
              <br />
              when you approve.
            </span>
          ) : (
            <span className={classes.confirmTitle}>
              Are you sure you want to decline
              <br />
              this contact suggestion
            </span>
          )}
        </SubmitConfirmation>
      )}
    </>
  );
};

export default Organisations;
