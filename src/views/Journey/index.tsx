import React, { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJournalsData } from 'slices/journey/action';

import { makeStyles } from '@material-ui/styles';
import { Divider, Hidden, Theme } from '@material-ui/core';

import {
  Summary,
  Journals,
  Calendar,
  JourneyAll,
  ButtonTabs
} from './components';
import { RootState } from 'reducer';
import { Loader, NotReadyPopup } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      padding: '16px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '16px 10%'
    },
    [theme.breakpoints.up('md')]: {
      padding: '16px 10%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: '16px 10%'
    }
  },
  headerTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '48px',
    lineHeight: '60px',
    color: '#37474F',
    textTransform: 'capitalize'
    // marginLeft: '8%'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '40px 0 20px',
    // justifyContent: 'space-between',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      marginLeft: '158px',
      marginRight: '158px'
    }
  },
  journey_contents: {
    padding: '20px',
    paddingLeft: '158px',
    paddingRight: '158px',
    display: 'flex',
    justifyContent: 'stretch'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Journey: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const { tab } = match.params;
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.journeyRoot.journey.loading
  );

  const [menu, setMenu] = useState(tab);

  useEffect(() => {
    dispatch(fetchJournalsData());
  }, [dispatch]);

  /** Dialog */
  const [notReady, setNotReady] = useState(false);

  const menuChangeHandler = (menu: string) => {
    setMenu(menu);
    if (menu === 'calendar') {
      setNotReady(true);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Hidden lgUp>
        {(menu === 'summary' || menu === 'all') && (
          <Redirect to="/journeys/summary" />
        )}
        {(menu === 'journals' || menu === 'all') && (
          <Redirect to="/journeys/journals" />
        )}
        {menu === 'calendar' && <Redirect to="/journeys/calendar" />}
        <ButtonTabs
          tabs={['summary', 'journals', 'calendar']}
          menu={menu}
          setMenu={menuChangeHandler}
        />
        <Hidden mdUp>
          <Divider className={classes.divider} />
        </Hidden>
        <div className={classes.content}>
          {tab === 'summary' && <Summary />}
          {tab === 'journals' && <Journals />}
          {tab === 'calendar' && <Calendar />}
        </div>
      </Hidden>
      <Hidden mdDown>
        {menu === 'calendar' ? (
          <Redirect to="/journeys/calendar" />
        ) : (
          <Redirect to="/journeys/all" />
        )}
        <div className={classes.header}>
          <span className={classes.headerTitle}>Journey</span>
          <ButtonTabs
            tabs={['all', 'calendar']}
            menu={menu}
            setMenu={menuChangeHandler}
          />
        </div>
        <div className={classes.journey_contents}>
          {tab === 'all' && <JourneyAll />}
          {tab === 'calendar' && <Calendar />}
        </div>
      </Hidden>
      {notReady && (
        <NotReadyPopup open={notReady} close={() => setNotReady(false)} />
      )}
    </>
  );
};

export default Journey;
