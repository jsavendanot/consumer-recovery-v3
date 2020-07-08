import React, { useState, Suspense } from 'react';
import useRouter from 'common/utils/useRouter';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { makeStyles } from '@material-ui/styles';
import { LinearProgress, Theme, Hidden } from '@material-ui/core';

import {
  GoalTopBar,
  JourneyTopBar,
  NetworkTopBar,
  SafetyTopBar,
  StoryTopBar,
  DefaultTopBar,
  ProfileTopBar
} from './TopBars';
import { NavBar } from '../components';
import clsx from 'clsx';
import { LogoutPopup } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    overflow: 'hidden'
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 150,
    minWidth: 150,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto',
    backgroundColor: '#FFFFFF'
  },
  contentWithBackground: {
    overflowY: 'auto',
    flex: '1 1 auto',
    backgroundColor: '#D5F2E3'
  },
  topBar: {
    zIndex: 2,
    position: 'relative',
    paddingTop: '20px'
  },
  storyTopBar: {
    zIndex: 2,
    position: 'absolute',
    top: '0',
    paddingTop: '20px',
    background: 'rgba(0, 0, 0, 0.5)'
  }
}));

const BaseLayoutWithNavbar: React.FC<RouteConfigComponentProps> = ({
  route
}) => {
  const { history } = useRouter();
  const classes = useStyles();

  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  let topBar = null;
  let menu = '';
  if (
    history.location.pathname === '/goals/current' ||
    history.location.pathname === '/goals/completed'
  ) {
    topBar = (
      <Hidden lgUp>
        <GoalTopBar
          className={classes.topBar}
          onOpenNavBarMobile={handleNavBarMobileOpen}
        />
      </Hidden>
    );
  } else if (
    history.location.pathname === '/journeys/all' ||
    history.location.pathname === '/journeys/journals' ||
    history.location.pathname === '/journeys/summary' ||
    history.location.pathname === '/journeys/calendar'
  ) {
    topBar = (
      <Hidden lgUp>
        <JourneyTopBar
          className={classes.topBar}
          onOpenNavBarMobile={handleNavBarMobileOpen}
        />
      </Hidden>
    );
  } else if (
    history.location.pathname === '/networks/people' ||
    history.location.pathname === '/networks/services'
  ) {
    menu = 'networks';
    topBar = (
      <Hidden lgUp>
        <NetworkTopBar
          className={classes.topBar}
          onOpenNavBarMobile={handleNavBarMobileOpen}
        />
      </Hidden>
    );
  } else if (history.location.pathname === '/safety') {
    topBar = (
      <Hidden lgUp>
        <SafetyTopBar
          className={classes.topBar}
          onOpenNavBarMobile={handleNavBarMobileOpen}
        />
      </Hidden>
    );
  } else if (history.location.pathname === '/story') {
    topBar = (
      <Hidden lgUp>
        <StoryTopBar
          className={classes.storyTopBar}
          onOpenNavBarMobile={handleNavBarMobileOpen}
        />
      </Hidden>
    );
  } else if (history.location.pathname === '/notification') {
    menu = 'notification';
    topBar = (
      <DefaultTopBar
        title="Notifications"
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
    );
  } else if (
    history.location.pathname ===
    `/profile/${sessionStorage.getItem('FirstName')}`
  ) {
    topBar = (
      <ProfileTopBar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
    );
  } else if (history.location.pathname === '/export') {
    menu = 'export';
    topBar = (
      <DefaultTopBar
        title="Export PDF"
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
    );
  } else if (history.location.pathname === '/settings') {
    menu = 'settings';
    topBar = (
      <DefaultTopBar
        title="Settings"
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
    );
  }

  return (
    <>
      <div className={classes.root}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
        <div className={classes.mainContainer}>
          {topBar}
          <div className={classes.container}>
            <main
              className={clsx(
                classes.content,
                menu !== '' && classes.contentWithBackground
              )}>
              <Suspense fallback={<LinearProgress />}>
                {route && renderRoutes(route.routes)}
              </Suspense>
            </main>
          </div>
        </div>
      </div>
      <LogoutPopup />
    </>
  );
};

export default BaseLayoutWithNavbar;
