import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Switch, Slide } from '@material-ui/core';
import { NotifSettings, AccountSettings } from './components';
import { useSelector, useDispatch } from 'react-redux';
import NotifSettingDetail from './NotifSettingDetail';
import AccountSettingDetail from './AccountSettingDetail';
import {
  fetchSettings,
  updateAccountCompletePrivateSetting
} from 'slices/settings/action';
import { RootState } from 'reducer';
import { Loader } from 'common/components';
import { AccountSetting } from 'types/settings';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '30px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    textTransform: 'uppercase',
    color: '#73BA9B'
  },
  subTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#37474F',
    marginBottom: '10px'
  },
  contentText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#B3B3B3'
  },
  card: {
    display: 'flex',
    padding: '20px',
    alignItems: 'center',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    margin: '20px 0'
  },
  navigation: {
    marginLeft: '20px'
  },
  section: {
    width: '550px'
  },
  gridItem1: {
    order: 2,
    alignSelf: 'flex-start'
  },
  gridItem2: {
    order: 1
  }
}));

const Settings: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.settings.loading
  );

  const accountSettings: AccountSetting = useSelector(
    (state: RootState) => state.settings.accountSettings
  );

  const [settingName, setSettingName] = useState('');
  const [notificationType, setNotificationType] = useState<
    | 'Update'
    | 'Comment'
    | 'Invitation'
    | 'Suggestion'
    | 'AccessRequest'
    | 'AccountReset'
    | ''
  >('');

  const back = () => {
    setSettingName('');
    setNotificationType('');
  };

  const setDetail = (
    settingName: string,
    notifType:
      | 'Update'
      | 'Comment'
      | 'Invitation'
      | 'Suggestion'
      | 'AccessRequest'
      | 'AccountReset'
      | ''
  ) => {
    setSettingName(settingName);
    setNotificationType(notifType);
  };

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const updateCompletePrivateSetting = () => {
    const updatedSetting: AccountSetting = {
      completePrivate: !accountSettings.completePrivate,
      autoLogin: accountSettings.autoLogin
    };
    dispatch(updateAccountCompletePrivateSetting(updatedSetting));
  };

  return (
    <>
      {loading && <Loader />}
      <div className={classes.root}>
        {notificationType === '' && (
          <Slide
            direction="right"
            in={notificationType === ''}
            mountOnEnter
            unmountOnExit>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} container className={classes.gridItem1}>
                <Grid item xs={12} container justify="center">
                  <div className={classes.section}>
                    <div className={classes.title}>Privacy</div>
                    <div className={classes.card}>
                      <div style={{ flexGrow: 1 }}>
                        <div className={classes.subTitle}>
                          Go complete private
                        </div>
                        <div className={classes.contentText}>
                          Nobody, including those who were granted access, can
                          access your content on Jiemba if you switch this on.
                          To return to the original sharing settings, switch it
                          off.
                        </div>
                      </div>
                      <div className={classes.navigation}>
                        <Switch
                          checked={
                            accountSettings.completePrivate
                              ? accountSettings.completePrivate
                              : false
                          }
                          color="primary"
                          edge="start"
                          name="completePrivate"
                          onChange={updateCompletePrivateSetting}
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} container justify="center">
                  <div className={classes.section}>
                    <div className={classes.title}>Account</div>
                    <AccountSettings click={setDetail} />
                  </div>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                container
                justify="center"
                className={classes.gridItem2}>
                <div className={classes.section}>
                  <div className={classes.title}>Notifications</div>
                  <NotifSettings click={setDetail} />
                </div>
              </Grid>
            </Grid>
          </Slide>
        )}
        {notificationType !== 'AccountReset' && (
          <NotifSettingDetail
            notificationType={notificationType}
            settingName={settingName}
            back={back}
          />
        )}
        {notificationType === 'AccountReset' && (
          <AccountSettingDetail
            notificationType={notificationType}
            settingName={settingName}
            back={back}
          />
        )}
      </div>
    </>
  );
};

export default Settings;
