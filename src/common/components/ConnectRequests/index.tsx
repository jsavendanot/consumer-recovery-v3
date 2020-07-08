import React from 'react';
import useRouter from 'common/utils/useRouter';
import { useSelector, useDispatch } from 'react-redux';

import {
  Dialog,
  DialogContent,
  Theme,
  Grid,
  IconButton,
  Button,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RootState } from 'reducer';
import { Invitation } from 'types/network';
import { Close } from '@material-ui/icons';
import {
  acceptConnectRequest,
  deleteInvitation
} from 'slices/network/invitation/action';

const useStyles = makeStyles((theme: Theme) => ({
  dialogContent: {
    padding: 0,
    [theme.breakpoints.up('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: '#FFFFFF'
    },
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      height: '500px',
      position: 'relative',
      background: '#FFFFFF'
    },
    '&:first-child': {
      padding: 0
    }
  },
  closeIcon: {
    margin: 5
  },
  requestContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    margin: '5px 0'
  },
  emailNameContainer: {
    flexGrow: 1
  },
  confirmButton: {
    padding: '5px 10px',
    boxSizing: 'border-box',
    borderRadius: '6px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#FFFFFF',
    backgroundColor: '#73BA9B',
    marginLeft: 10,
    '&:hover': {
      backgroundColor: '#076A38'
    }
  },
  deleteButton: {
    padding: '5px 10px',
    border: '1px solid #B3B3B3',
    boxSizing: 'border-box',
    borderRadius: '6px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#37474F',
    marginLeft: 10
  },
  email: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#B3B3B3',
    wordWrap: 'break-word',
    width: 200
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#003E1F',
    wordWrap: 'break-word',
    width: 200
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '28px',
    color: '#73BA9B'
  },
  divider: {
    border: '1px solid #73BA9B',
    margin: '10px 0'
  }
}));

type Props = {
  open: boolean;
  close: () => void;
};

export const ConnectRequests: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = useRouter();

  const connectRequests: Invitation[] = useSelector(
    (state: RootState) => state.networkRoot.invitation.connectRequests
  );

  const acceptButtonClickHandler = (
    invitationId: string,
    email: string | undefined,
    name: string | undefined,
    accountType: 'Patient' | 'Practitioner' | 'RelatedPerson' | undefined
  ) => {
    email &&
      name &&
      dispatch(
        acceptConnectRequest(
          invitationId,
          email,
          name,
          close,
          accountType === 'RelatedPerson'
            ? 'Person'
            : accountType === 'Practitioner'
            ? 'Organisation'
            : 'Person',
          history
        )
      );
    // close();
  };

  const deleteButtonClickHandler = (invitationId: string) => {
    dispatch(deleteInvitation(invitationId));
    close();
  };

  return (
    <Dialog open={open} keepMounted onClose={close}>
      <DialogContent className={classes.dialogContent}>
        <Grid container>
          <Grid item xs={12} container justify="flex-end">
            <IconButton onClick={close} className={classes.closeIcon}>
              <Close fontSize="large" style={{ fill: '#73BA9B' }} />
            </IconButton>
          </Grid>

          <Grid item xs={12} container justify="center">
            <Grid item xs={11} sm={10}>
              <div className={classes.title}>Connect Requests</div>
            </Grid>
            <Grid item xs={11} sm={10}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={11} sm={10}>
              {connectRequests.map(request => {
                return (
                  <div
                    key={request.InvitationId}
                    className={classes.requestContainer}>
                    <div className={classes.emailNameContainer}>
                      <div className={classes.name}>{request.Name}</div>
                      <div className={classes.email}>
                        {request.InviterUserEmailAddress}
                      </div>
                    </div>
                    {!request.AcceptedOn && (
                      <Button
                        className={classes.confirmButton}
                        onClick={() =>
                          acceptButtonClickHandler(
                            request.InvitationId,
                            request.InviterUserEmailAddress,
                            request.Name,
                            request.InviterContactType
                          )
                        }>
                        Accept
                      </Button>
                    )}
                    <Button
                      className={classes.deleteButton}
                      onClick={() =>
                        deleteButtonClickHandler(request.InvitationId)
                      }>
                      Delete
                    </Button>
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectRequests;
