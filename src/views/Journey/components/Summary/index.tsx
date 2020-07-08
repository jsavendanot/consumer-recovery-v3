import React, { useState, ChangeEvent } from 'react';
import useRouter from 'common/utils/useRouter';

import { makeStyles } from '@material-ui/styles';
import { Grid, Button, Tabs, Tab, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import MenuBox from '../MenuBox';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '23px',
    textAlign: 'center',
    color: '#B3B3B3',
    margin: '20px 0'
  },
  button: {
    position: 'fixed',
    bottom: '4%',
    right: '7%',
    width: '77px',
    height: '77px',
    background: '#006633',
    borderRadius: '50%'
  },
  icon: {
    color: '#FFFFFF',
    marginLeft: '-13px',
    marginTop: '14px'
  },
  summary: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
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
  summaryTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#73BA9B'
  }
}));

const Summary: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const [summary] = useState(true);

  /** Tabs */
  const [tab, setTab] = useState('year');

  const tabs = [
    { value: 'all', label: 'ALL' },
    { value: 'week', label: 'WEEK' },
    { value: 'month', label: 'MONTH' },
    { value: 'year', label: 'YEAR' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string) => {
    switch (value) {
      case 'all': {
        return setTab('all');
      }
      case 'week': {
        return setTab('week');
      }
      case 'month': {
        return setTab('month');
      }
      case 'year': {
        return setTab('year');
      }
      default:
        return;
    }
  };

  return (
    <>
      {!summary && (
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            <div className={classes.content}>
              <span className={classes.text}>
                You don't have any journal yet.
              </span>
              <img src="/images/goal/jiemba.svg" alt="" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.button}
              onClick={() => history.push('/create/journal')}>
              <Add className={classes.icon} />
            </Button>
          </Grid>
        </Grid>
      )}
      <div className={classes.summary}>
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable">
          {tabs.map(tab => (
            <Tab
              key={tab.value}
              label={<span className={classes.summaryTitle}>{tab.label}</span>}
              value={tab.value}
            />
          ))}
        </Tabs>
        {tab === 'all' && <MenuBox filter="all" />}
        {tab === 'week' && <MenuBox filter="week" />}
        {tab === 'month' && <MenuBox filter="month" />}
        {tab === 'year' && <MenuBox filter="year" />}
      </div>
      <Button
        className={classes.button}
        onClick={() => history.push('/create/journal')}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABI1BMVEUAAAD/////////////////i4v/iIjx////jo5ttp7/hob///91v5//ior/////yMj/19f/////xsb/////yMj///////////9WVlb///9XV1f/////////iIj/////////iYn/iIj///////////////8vLy+Hw6qFw6cuLi7/iIj/iIhzupvz8/P/iIj///8AAAB0upvz8/P///9zupv6/fz/iIj/iIgCAgL/iIj///8CAgKBwaWCwKWEwab///+HxKmIxar/1NT/8fH/////1NT/8/P////78vH/7e3/7+//7+/77+777+/88fH///////8AAAABAQEFBQVFRUVPT09zupt4vJ95vZ/Z7OTd7ufn5+f/iIj/jY3/jo7/4+P///8GjNvMAAAAUXRSTlMAAwQFBgsPEhIVFRUYGBglJiYoKi47P0ZHSkyGiZCRlZeYmZydpL+/wMPKzdLS0tLW1tbW193k5efn6Onp6+vr7Ozt7u7v7+/z9/j5+vr6/f4aKyPfAAAAAWJLR0Rgxbd8EAAAAR1JREFUOMvt1NdSwmAQBeBVFESssRfsXcSKihJ7ITaMZUWMet7/KbwA/BP82wO419+cmZ05u0S6iU/nd9OtZJz2bBAEwWqbyTlnn4GNdDx8f1lIxwNsZLcHCLmi3Ch1DoRlWuXWgYjck7vkUg5RmZe7DBeKUTmlcMzufVhm4yrHfPQg5GWn2jG7d3V3269zQppcXd4YHbNbBK56zI65kNvusnHMiyk7t9Px7yhx+sdlkrICzr2/NbhNWR71PaJByh1NAlGpcC3XAFApmxyNVOv5mynfg4hma4WvZaryqPkYYal0NCiOrVLWOBpHSJ6oHW0JV5pPqN3o08tHlV1M9Or+5bLvvwI4mBmK6R/woe8/r40NNBk//8b+wjBZzA/iA8zSQjjFzgAAAABJRU5ErkJggg=="
          alt=""
          style={{ marginBottom: '10px', marginLeft: '10px' }}
        />
        <Add className={classes.icon} />
      </Button>
    </>
  );
};

export default Summary;
