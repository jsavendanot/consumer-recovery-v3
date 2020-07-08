import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Item } from 'types/safety';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  content: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '11px',
    lineHeight: '16px',
    color: '#000000',
    marginTop: '7px'
  },
  subtitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '11px',
    lineHeight: '16px',
    color: '#000000'
  }
}));

type Props = {};
export const Strategy: React.FC<Props> = () => {
  const classes = useStyles();

  const strategies: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.warning.strategies
  );

  return (
    <Grid container style={{ border: '1px solid #73BA9B' }}>
      <Grid
        item
        xs={12}
        container
        direction="column"
        style={{ padding: '10px' }}>
        <div className={classes.subtitle}>
          If I start having difficulties my plan will be to...
        </div>
        <div className={classes.content}>
          {strategies.map(item => {
            return item.name + ', ';
          })}
        </div>
      </Grid>
    </Grid>
  );
};

export default Strategy;
