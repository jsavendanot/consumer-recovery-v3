import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import NotifCard from './NotifCard';
import { fetchNotifications } from 'slices/notifications/action';
import { RootState } from 'reducer';
import { Loader } from 'common/components';
import { NotificationItem } from 'types/notification';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: '30px',
    marginBottom: '30px'
  }
}));

const Notifications: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.notifications.loading
  );

  const notifications: NotificationItem[] = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className={classes.root}>
        <Grid container spacing={3} justify="center">
          {notifications.map(notif => {
            return (
              <Grid
                item
                xs={12}
                sm={10}
                container
                justify="center"
                key={notif.Id}>
                <NotifCard notification={notif} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default Notifications;
