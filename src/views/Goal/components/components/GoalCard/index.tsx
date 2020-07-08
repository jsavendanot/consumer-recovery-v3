import React, { useState } from 'react';
import clsx from 'clsx';
import useRouter from 'common/utils/useRouter';
import { Goal } from 'types/goal';
import { FocusArea } from 'types/other';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Theme } from '@material-ui/core';

import StepsSummary from './StepsSummary';
import Suggest from './Suggest';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    padding: '0'
  },
  focusAreaContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '134px',
    width: '100%',
    backgroundColor: '#FFFFFF'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#003E1F'
  },
  nameSuggested: {
    color: '#C57D7D'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '10px 20px'
  },
  card: {
    width: '100%'
    // width: '280px',
    // [theme.breakpoints.up('lg')]: {
    //   width: '270px'
    // },
    // margin: '0 15px 20px'
  },
  suggestText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#37474F'
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '134px'
  },
  card_div: {
    width: '100%',
    padding: '5px'
  }
}));

type Props = {
  goal: Goal;
};

const GoalCard: React.FC<Props> = ({ goal }) => {
  const classes = useStyles();
  const { history, location } = useRouter();

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const [focusArea] = useState<FocusArea>(
    focusAreas.find(area => area.id === goal.FocusArea)!
  );

  const showDetail = () => {
    history.push(`${location.pathname}/${goal.Id}`);
  };

  const reviewSuggestion = () => {
    history.push(`${location.pathname}/${goal.Id}/review`);
  };

  return (
    <div className={classes.card_div}>
      {goal.SuggestionId && (
        <div style={{ padding: '10px 16px' }}>
          <span className={classes.suggestText}>
            Recommended by service providers
          </span>
          <div
            style={{
              borderBottom: '1px solid rgba(55, 71, 79, 0.6)',
              marginTop: '5px'
            }}
          />
        </div>
      )}
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          {focusArea && (
            <div
              className={classes.focusAreaContainer}
              style={{ backgroundColor: focusArea.color, cursor: 'pointer' }}>
              {goal.Image !== null && goal.Image !== '' ? (
                <img
                  src={'data:image/png;base64,' + goal.Image}
                  alt=""
                  className={classes.image}
                  onClick={goal.SuggestionId ? reviewSuggestion : showDetail}
                />
              ) : (
                <img
                  src={'/images/areas/' + focusArea.image}
                  alt=""
                  style={{ height: '134px' }}
                  // style={{ height: '134px', width: '134px' }}
                  onClick={goal.SuggestionId ? reviewSuggestion : showDetail}
                />
              )}
            </div>
          )}
          <div className={classes.nameContainer}>
            <span
              className={clsx(
                classes.name,
                goal.SuggestionId && classes.nameSuggested
              )}>
              {goal.Name}
            </span>
          </div>
          {!goal.SuggestionId ? (
            <StepsSummary goal={goal} />
          ) : (
            <Suggest goal={goal} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalCard;
