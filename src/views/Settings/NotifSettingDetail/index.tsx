import React from 'react';
import { Slide, Grid, Switch, IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  ArrowBackIos,
  NotificationsNone,
  MailOutline
} from '@material-ui/icons';
import { NotificationSetting } from 'types/settings';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { updateNotificationSetting } from 'slices/settings/action';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    marginBottom: '20px'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F'
  },
  helpText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#73BA9B'
  },
  card: {
    display: 'flex',
    padding: '10px 20px',
    alignItems: 'center',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    margin: '10px 0px'
  },
  navigation: {
    marginLeft: '20px'
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      width: '500px'
    }
  }
}));

type Props = {
  notificationType:
    | 'Update'
    | 'Comment'
    | 'Invitation'
    | 'Suggestion'
    | 'AccessRequest'
    | 'AccountReset'
    | '';
  settingName: string;
  back: () => void;
};
export const NotifSettingDetail: React.FC<Props> = ({
  notificationType,
  settingName,
  back
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const notifSettings: NotificationSetting[] = useSelector((state: RootState) =>
    state.settings.notifSettings.filter(
      item => item.NotificationType === notificationType
    )
  );

  const updateNotifHandler = (notif: NotificationSetting) => {
    notif && dispatch(updateNotificationSetting(notif));
  };

  return (
    <Slide
      direction="left"
      in={notificationType !== ''}
      mountOnEnter
      unmountOnExit>
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={2} container justify="center">
          <IconButton onClick={back}>
            <ArrowBackIos style={{ fill: '#73BA9B' }} fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={10} container>
          <Grid item xs={12}>
            <div className={classes.title}>{settingName}</div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.helpText}>
              Where you receive these notifications
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.section}>
              <div className={classes.card}>
                <div
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <NotificationsNone
                    style={{ fill: '#37474F', marginRight: '5px' }}
                  />
                  <div className={classes.subTitle}>Push</div>
                </div>
                <div className={classes.navigation}>
                  <Switch
                    checked={
                      notifSettings.find(
                        item =>
                          item.NotificationMethod === 'Push' &&
                          item.State === 'Active'
                      )
                        ? true
                        : false
                    }
                    color="primary"
                    edge="start"
                    name="Push"
                    onChange={() =>
                      updateNotifHandler(
                        notifSettings.find(
                          item => item.NotificationMethod === 'Push'
                        )!
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.section}>
              <div className={classes.card}>
                <div
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                  <MailOutline
                    style={{ fill: '#37474F', marginRight: '10px' }}
                  />
                  <div className={classes.subTitle}>Email</div>
                </div>
                <div className={classes.navigation}>
                  <Switch
                    checked={
                      notifSettings.find(
                        item =>
                          item.NotificationMethod === 'Email' &&
                          item.State === 'Active'
                      )
                        ? true
                        : false
                    }
                    color="primary"
                    edge="start"
                    name="Email"
                    onChange={() =>
                      updateNotifHandler(
                        notifSettings.find(
                          item => item.NotificationMethod === 'Email'
                        )!
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
};

export default NotifSettingDetail;
