import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { FocusArea } from 'types/other';

import { makeStyles } from '@material-ui/styles';
import { Grid, Theme, IconButton } from '@material-ui/core';
import { AddCircleOutlined, Cancel, CheckCircle } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { Network } from 'types/network';
import {
  rejectFocusAreaSuggestion,
  acceptFocusAreaSuggestion
} from 'slices/suggestion/story/action';
import { SubmitConfirmation } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    // [theme.breakpoints.up('xs')]: {
    //   height: 155
    // },
    // [theme.breakpoints.up('sm')]: {
    //   height: 210
    // },
    // [theme.breakpoints.up('md')]: {
    //   height: 225
    // },
    // [theme.breakpoints.up('lg')]: {
    //   height: 166
    // },
    // border: '1.5px solid #73BA9B',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    borderRadius: '12px',
    position: 'relative',
    textAlign: 'center'
  },
  boxTitle: {
    background: '#FFFFFF',
    // border: '1.5px solid #73BA9B',
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: '10px 5px',
    textAlign: 'center',
    position: 'relative',
    bottom: '0',
    width: '100%',
    marginTop: -4,
    height: 61,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#003E1F'
  },
  imageContainer: {
    // padding: '10px 0',
    boxSizing: 'border-box'
  },
  image: {
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '74%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    }
  },
  cardTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '35px',
    color: '#73BA9B'
  },
  iconButton: {
    position: 'absolute',
    top: '-5px',
    right: '-2px'
  },
  addMoreText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B'
  },
  addMoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
    cursor: 'pointer'
  },
  iconContainer: {
    display: 'flex'
  },
  suggestRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 20px'
  },
  createdBy: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#B3B3B3'
  }
}));

type Props = {
  myFocusAreas: FocusArea[];
};

const MyFocusAreas: React.FC<Props> = ({ myFocusAreas }) => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const suggestedFocusAreas: FocusArea[] = useSelector(
    (state: RootState) => state.suggestion.focusAreas
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
      dispatch(acceptFocusAreaSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  const rejectSuggestion = () => {
    if (selectedSuggestionId.length > 0) {
      dispatch(rejectFocusAreaSuggestion(selectedSuggestionId));
      setActionType('');
      setSelectedSuggestionId('');
    }
  };

  return (
    <div>
      <Grid container>
        {myFocusAreas.concat(suggestedFocusAreas).map(area => {
          return (
            <Grid item xs={6} sm={6} md={4} lg={3} key={area.id}>
              <div className={classes.container}>
                <div
                  className={classes.box}
                  style={{ background: `${area.color}` }}>
                  <div className={classes.imageContainer}>
                    <img
                      src={'/images/areas/' + area.image}
                      className={classes.image}
                      alt=""
                    />
                  </div>
                  <div className={classes.boxTitle}>
                    <span className={classes.title}>{area.name}</span>
                  </div>
                </div>
              </div>
              {area.SuggestionId && (
                <div className={classes.suggestRoot}>
                  <div className={classes.createdBy}>
                    Created by{' '}
                    {
                      networks.find(
                        item => item.UserId === area.SuggestedByUserId
                      )?.Name
                    }
                  </div>
                  <div className={classes.iconContainer}>
                    <IconButton
                      style={{ padding: '5px', margin: '0 8px' }}
                      onClick={() => openDialog('reject', area.SuggestionId!)}>
                      <Cancel style={{ fill: '#FF743E' }} fontSize="large" />
                    </IconButton>
                    <IconButton
                      style={{ padding: '5px', margin: '0 8px' }}
                      onClick={() => openDialog('accept', area.SuggestionId!)}>
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
            </Grid>
          );
        })}
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          container
          alignItems="center"
          justify="center">
          <div
            className={classes.addMoreContainer}
            onClick={() => history.push('/story/focusareas')}>
            <IconButton>
              <AddCircleOutlined style={{ fill: '#73BA9B' }} />
            </IconButton>
            <span className={classes.addMoreText}>Add more</span>
          </div>
        </Grid>
      </Grid>
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
              This focus area will become yours
              <br />
              when you approve.
            </span>
          ) : (
              <span className={classes.title}>
                Are you sure you want to decline
                <br />
              this focus area suggestion
              </span>
            )}
        </SubmitConfirmation>
      )}
    </div>
  );
};

export default MyFocusAreas;
