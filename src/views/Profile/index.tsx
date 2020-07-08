import React, { useState, ChangeEvent, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from 'common/utils/useRouter';
import { RootState } from 'reducer';
import { Profile as ProfileType } from 'types/profile';
import { fetchProfile } from 'slices/profile/action';

import { Loader, NotReadyPopup } from 'common/components';
import { makeStyles } from '@material-ui/styles';
import { Grid, Avatar, Tabs, Tab, Theme } from '@material-ui/core';
import { General } from './components';

const useStyles = makeStyles((theme: Theme) => ({
  container1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#73BA9B'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    marginBottom: '10px'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  name: {
    marginTop: '10px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '26px',
    color: '#FFFFFF'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-around'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fa9419'
    },
    marginBottom: '10px'
  },
  label: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '17px',
    color: '#FFFFFF',
    cursor: 'pointer'
  },
  tabContainer: {
    [theme.breakpoints.up('xs')]: {
      paddingBottom: '20px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 20px 20px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 20% 30px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 20% 30px'
    }
  }
}));

const Profile: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.profile.loading
  );

  const profileState: ProfileType = useSelector(
    (state: RootState) => state.profile.profile
  );

  const { history } = useRouter();

  /** Tabs */
  const [tab, setTab] = useState('general');

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'health', label: 'Health' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    value === 'general' ? setTab('general') : setNotReady(true);
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  /** Dialog */
  const [notReady, setNotReady] = useState(false);

  if (sessionStorage.getItem('DateOfBirth') === 'null') {
    return (
      <Redirect to={`/profile/${sessionStorage.getItem('FirstName')}/create`} />
    );
  }

  return (
    <>
      {loading && <Loader />}
      <Grid container className={classes.container1}>
        <Grid item xs={12}>
          <div
            className={classes.avatarContainer}
            onClick={() =>
              history.push(`/profile/${sessionStorage.getItem('FirstName')}`)
            }>
            <Avatar
              alt=""
              className={classes.avatar}
              src={sessionStorage.getItem('Avatar')!}
            />
            <span className={classes.name}>
              {sessionStorage.getItem('FirstName')}{' '}
              {sessionStorage.getItem('Surname')}
            </span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            className={classes.tabs}
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={tab}
            variant="scrollable">
            {tabs.map(tab => (
              <Tab
                key={tab.value}
                label={<span className={classes.label}>{tab.label}</span>}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Grid>
      </Grid>
      <div className={classes.tabContainer}>
        {tab === 'general' && <General profile={profileState} />}
      </div>
      {notReady && (
        <NotReadyPopup open={notReady} close={() => setNotReady(false)} />
      )}
    </>
  );
};

export default Profile;
