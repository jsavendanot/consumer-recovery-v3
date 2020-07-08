import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Item } from 'types/safety';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
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
export const StayWell: React.FC<Props> = () => {
  const classes = useStyles();

  const staywell: Item[] = useSelector(
    (state: RootState) => state.safetyRoot.staywell.items
  );

  return (
    <Grid container style={{ border: '1px solid #73BA9B' }}>
      <Grid
        item
        xs={12}
        container
        justify="center"
        style={{ backgroundColor: '#73BA9B', padding: '5px 0' }}>
        <span className={classes.headerText}>My safety plan</span>
      </Grid>
      <Grid
        item
        xs={12}
        container
        direction="column"
        style={{ padding: '10px' }}>
        <div className={classes.subtitle}>
          Things I can do to be and stay well
        </div>
        <div className={classes.content}>
          {staywell.map(item => {
            return item.name + ', ';
          })}
        </div>
      </Grid>
    </Grid>
  );
};

export default StayWell;
