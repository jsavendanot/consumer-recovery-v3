import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles, withStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';

import { MoodOverTime, AverageMood, CircularProgress } from './components';
import { Goal } from 'types/goal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { JournalChart } from 'types/journey';
import moment from 'moment';
import { filterJournalsByDateRange } from 'slices/journey/action';

const useStyles = makeStyles(() => ({
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0'
  },
  tabDate: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '15px',
    color: '#73BA9B'
  },
  tabSubMenuBoxActive: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    padding: '10px 0',
    border: '0.5px solid #DFDFDF',
    boxSizing: 'border-box',
    borderRadius: 1,
    borderBottom: '5px solid #F79221'
  },
  tabSubMenuBox: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    padding: '10px 0',
    border: '0.5px solid #DFDFDF',
    boxSizing: 'border-box',
    borderRadius: 1
  },
  tabSubMenuTextActive: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#003E1F'
  },
  tabSubMenuText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(115, 186, 155, 0.5)'
  },
  progressText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#F79221'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: '#EDEDED'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#36B77E'
  }
})(LinearProgress);

type Props = {
  filter: 'all' | 'week' | 'month' | 'year';
};

const MenuBox: React.FC<Props> = ({ filter }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goals: Goal[] = useSelector(
    (state: RootState) => state.goalRoot.goal.goals
  );

  const journalsChart: JournalChart[] = useSelector(
    (state: RootState) => state.journeyRoot.journey.journalsChart
  );

  const [startDateOfRange, setStartDateOfRange] = useState('');

  /** Tabs */
  const [tab, setTab] = useState('mood');

  const handleTabsChange = (value: string) => {
    switch (value) {
      case 'mood': {
        return setTab('mood');
      }
      case 'goals': {
        return setTab('goals');
      }
      default:
        return;
    }
  };

  /** Mood over time */
  const data = {
    data: [...journalsChart.map(item => item.HowAreYouFeeling)],
    labels: [
      ...journalsChart.map(item =>
        moment(item.CreatedOnDate).format('MMMM Do, h:mm a')
      )
    ]
  };

  useEffect(() => {
    dispatch(filterJournalsByDateRange(filter));

    const startDateRange =
      filter === 'week'
        ? moment()
            .subtract(1, 'weeks')
            .startOf('week')
            .format('YYYY-MM-DD')
        : filter === 'month'
        ? moment()
            .subtract(1, 'months')
            .startOf('month')
            .format('YYYY-MM-DD')
        : filter === 'year'
        ? moment()
            .startOf('year')
            .format('YYYY-MM-DD')
        : moment()
            .subtract(1, 'years')
            .startOf('year')
            .format('YYYY-MM-DD');

    setStartDateOfRange(startDateRange);
  }, [dispatch, filter]);

  return (
    <div className={classes.tabContainer}>
      <span className={classes.tabDate}>
        {`${moment(startDateOfRange).format('MMMM Do YYYY')} - 
        ${moment(new Date().toDateString()).format('MMMM Do YYYY')}`}
      </span>
      <div style={{ display: 'flex', width: '100%' }}>
        <div
          className={clsx(
            tab === 'mood' && classes.tabSubMenuBoxActive,
            tab !== 'mood' && classes.tabSubMenuBox
          )}
          onClick={() => handleTabsChange('mood')}>
          {journalsChart.length > 0 && (
            <AverageMood
              tab={tab}
              feelings={[...journalsChart.map(item => item.HowAreYouFeeling)]}
            />
          )}
          <span
            className={clsx(
              tab === 'mood' && classes.tabSubMenuTextActive,
              tab !== 'mood' && classes.tabSubMenuText
            )}>
            Average Mood
          </span>
        </div>
        <div
          className={clsx(
            tab === 'goals' && classes.tabSubMenuBoxActive,
            tab !== 'goals' && classes.tabSubMenuBox
          )}
          onClick={() => handleTabsChange('goals')}>
          <CircularProgress
            value={
              goals.length > 0
                ? (goals.filter(item => item.PercentageComplete === 1).length /
                    goals.length) *
                  100
                : 0
            }
            active
          />
          <span
            className={clsx(
              tab === 'goals' && classes.tabSubMenuTextActive,
              tab !== 'goals' && classes.tabSubMenuText
            )}>
            Goals Achieved
          </span>
        </div>
      </div>
      <div style={{ width: '100%', marginTop: '20px' }}>
        {tab === 'mood' && (
          <MoodOverTime data={data.data} labels={data.labels} />
        )}
        {tab === 'goals' && (
          <>
            {goals
              .filter(item => item.PercentageComplete === 1)
              .map(goal => {
                return (
                  <div key={goal.Id} style={{ margin: '10px 0' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                      <span
                        className={classes.progressText}
                        style={{ flexGrow: 1 }}>
                        {goal.Name}
                      </span>
                      <KeyboardArrowRight style={{ fill: '#F79221' }} />
                    </div>
                    <div style={{ padding: '10px 0px' }}>
                      <BorderLinearProgress
                        variant="determinate"
                        color="primary"
                        value={goal.PercentageComplete * 100}
                      />
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuBox;
