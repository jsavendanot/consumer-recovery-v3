import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Theme } from '@material-ui/core';
import { Item } from 'types/safety';

import { ListItems, SuggestedItem } from './components';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles((theme: Theme) => ({
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#323F45'
  },
  valueText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#37474F'
  }
}));

type Props = {
  difficulties: Item[];
};
export const Difficulties: React.FC<Props> = ({ difficulties }) => {
  const classes = useStyles();

  const suggestedDifficulties: Item[] = useSelector(
    (state: RootState) => state.suggestion.difficulties
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <span className={classes.subTitle}>
          Things I or others may notice when I am unwell.
        </span>
      </Grid>
      <Grid item xs={12}>
        <ListItems items={difficulties} />
      </Grid>
      <Grid item xs={12}>
        {suggestedDifficulties.map(item => {
          return <SuggestedItem item={item} />;
        })}
      </Grid>
    </Grid>
  );
};

export default Difficulties;
