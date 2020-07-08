import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Theme } from '@material-ui/core';
import { Item } from 'types/safety';

import { ListItems, SuggestedItem } from './components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  headerText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '28px',
    lineHeight: '35px',
    color: '#37474F',
    flexGrow: 2,
    marginTop: '10px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '12px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '15px'
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: '15px'
    }
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
  }
}));

type Props = {
  strategies: Item[];
};
export const Strategies: React.FC<Props> = ({ strategies }) => {
  const classes = useStyles();

  const suggestedStrategies: Item[] = useSelector(
    (state: RootState) => state.suggestion.strategies
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <span className={classes.headerText}>
          If I start having difficulties, my plan will be to...
        </span>
      </Grid>
      <Grid item xs={12} style={{ padding: '10px 0' }}>
        <span className={classes.subTitle}>
          Strategies or actions I can try if I start having difficulties.
        </span>
      </Grid>
      <Grid item xs={12}>
        <ListItems items={strategies} />
      </Grid>
      <Grid item xs={12}>
        {suggestedStrategies.map(item => {
          return <SuggestedItem item={item} />;
        })}
      </Grid>
    </Grid>
  );
};

export default Strategies;
