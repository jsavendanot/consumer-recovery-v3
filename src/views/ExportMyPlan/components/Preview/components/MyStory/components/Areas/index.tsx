import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FocusArea } from 'types/other';

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
    color: '#000000'
  }
}));

type Props = {
  myAreas: FocusArea[];
};

export const Areas: React.FC<Props> = ({ myAreas }) => {
  const classes = useStyles();
  return (
    <Grid container style={{ border: '1px solid #73BA9B' }}>
      <Grid
        item
        xs={12}
        container
        justify="center"
        style={{ backgroundColor: '#73BA9B', padding: '5px 0' }}>
        <span className={classes.headerText}>AREAS I WANT TO WORK ON</span>
      </Grid>
      <Grid item xs={12} container style={{ padding: '10px' }}>
        <div className={classes.content}>
          {myAreas.map(item => {
            return item.name + ', ';
          })}
        </div>
      </Grid>
    </Grid>
  );
};

export default Areas;
