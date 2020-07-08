import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Invitation } from 'types/network';
import { Grid, Switch } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  label: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '26px',
    color: '#37474F'
  }
}));

type Props = {
  invitation: Invitation;
  change: (name: string, value: string | boolean) => void;
};

export const Access: React.FC<Props> = ({ invitation, change }) => {
  const classes = useStyles();
  return (
    <>
      <div style={{ padding: '10px', border: '1px solid #D5F2E3' }}>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={8}>
            <span className={classes.label}>My goals</span>
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <Switch
              checked={invitation.ShareAllGoals}
              color="primary"
              edge="start"
              name="goal"
              onChange={() =>
                change('ShareAllGoals', !invitation.ShareAllGoals)
              }
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ padding: '10px', border: '1px solid #D5F2E3' }}>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={8}>
            <span className={classes.label}>My journey</span>
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <Switch
              checked={invitation.ShareAllJournals}
              color="primary"
              edge="start"
              name="journey"
              onChange={() =>
                change('ShareAllJournals', !invitation.ShareAllJournals)
              }
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ padding: '10px', border: '1px solid #D5F2E3' }}>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={8}>
            <span className={classes.label}>My story</span>
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <Switch
              checked={invitation.ShareMyStory}
              color="primary"
              edge="start"
              name="story"
              onChange={() => change('ShareMyStory', !invitation.ShareMyStory)}
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ padding: '10px', border: '1px solid #D5F2E3' }}>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={8}>
            <span className={classes.label}>My safety plan</span>
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <Switch
              checked={invitation.ShareSafetyPlan}
              color="primary"
              edge="start"
              name="safety"
              onChange={() =>
                change('ShareSafetyPlan', !invitation.ShareSafetyPlan)
              }
            />
          </Grid>
        </Grid>
      </div>
      <div style={{ padding: '10px', border: '1px solid #D5F2E3' }}>
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={8}>
            <span className={classes.label}>My network</span>
          </Grid>
          <Grid item xs={4} container justify="flex-end">
            <Switch
              checked={invitation.ShareNetworkContacts}
              color="primary"
              edge="start"
              name="network"
              onChange={() =>
                change('ShareNetworkContacts', !invitation.ShareNetworkContacts)
              }
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Access;
