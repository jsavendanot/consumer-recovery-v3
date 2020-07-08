import React from 'react';
import { Grid, Theme, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Invitation } from 'types/network';
import PendingCard from './PendingCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '20px'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  },
  divider: {
    background: '#37474F',
    border: ' 1px solid rgba(55, 71, 79, 0.6)',
    margin: '10px 0 20px 0'
  }
}));

type Props = {
  invitations: Invitation[];
};

export const PendingContacts: React.FC<Props> = ({ invitations }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} lg={10} container justify="center">
        <Grid item xs={11} sm={12}>
          <span className={classes.title}>Pending connections</span>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
      {invitations.map(invitation => {
        return (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={5}
            xl={4}
            container
            justify="center"
            style={{ alignSelf: 'flex-start', padding: '1%' }}
            key={invitation.InvitationId}>
            <PendingCard invitation={invitation} />
          </Grid>
        );
      })}
      <Grid item lg={5} />
    </Grid>
  );
};

export default PendingContacts;
